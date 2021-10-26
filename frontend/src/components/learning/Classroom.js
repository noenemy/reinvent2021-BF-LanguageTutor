import React, { Component } from 'react';
import UnitList from './UnitList';
import TitleBar from './TitleBar';
import Sumerian from './Sumerian';
import Whiteboard from './Whiteboard';
import Navigator from './Navigator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class ClassroomComponent extends Component {

    state = {
        courseId: null,
        lectureId: null,
        units: null,
        currentUnitIndex: null,
        currentUnitTitle: null,
        steps: null,
        currentStep: null,
        language: "english",
        lectures: null,
        loading: false
    };

    componentDidMount() {
        const current = decodeURI(window.location.href);
        const search = current.split("?")[1];
        const params = new URLSearchParams(search);
        const courseId = params.get('courseId');
        const lectureId = params.get('lectureId');
        this.setState({ courseId: courseId });
        this.setState({ lectureId: lectureId }, () => {

            this.getLectureUnits(courseId, lectureId);
            if (this.state.currentUnitIndex == null) {
                window.addEventListener('message', this.handleChildMessage);
            }
        });

    }

    componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted.
        window.removeEventListener("message", this.handleChildMessage);
    }

    handleChildMessage = (event) => {
        toast.info(event.data);
        if (event.data === "SUMERIAN_LOAD_COMPLETED") {
            this.startLearning();
        }
    }

    async startLearning() {
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }

        //console.log(this.state.steps);
        //console.log(this.state.currentStep);
        const step = this.state.steps[this.state.currentStep];
        //console.log('current step:' + step);
        for (var i in step.dialogs) {
            const dialog = step.dialogs[i].dialog;
            if (step.dialogs[i].host == "1") {
                console.log("speak Teacher" + dialog);
                this.speakTeacher(dialog);
            } else if (step.dialogs[i].host == "2") {
                console.log("speak guest" + dialog);
                this.speakGuest(dialog);
            }
            await sleep(step.dialogs[i].time);
        }

    }
    
    speakTeacher(message) {
        const msg = {
            'type': 'play',
            'host': 'Alien',
            'dialog': message
        };

        const sumerian = document.getElementById('sumerianHost');
        sumerian.contentWindow.postMessage(msg, '*');
    }

    speakGuest(message) {
        const msg = {
            'type': 'play',
            'host': 'Luke',
            'dialog': message
        };

        const sumerian = document.getElementById('sumerianHost');
        sumerian.contentWindow.postMessage(msg, '*');
    }

    async getLectureUnits(courseId=1, lectureId=1) {

        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/courses/${courseId}/lectures/${lectureId}/units`;
        //console.log(backendAPI);
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res != null && res.data.listCourses != null) {
            this.setState({ units: res.data.listCourses.items }, () => {
                this.selectCurrentUnit(1); // set default unit
            });
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    async getUnitSteps(courseId=1, lectureId=1, unitId=1) {

        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/courses/${courseId}/lectures/${lectureId}/units/${unitId}/steps`;
        console.log(backendAPI);
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        console.log(res.data);
        if (res != null && res.data.steps != null) {
            this.setState({ steps: res.data.steps, currentStep: 0 });
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    selectCurrentUnit = (unit_order) => {

        var unitTitle = "";
        var unitId = "";
        for (var i in this.state.units) {
            if (this.state.units[i].unit_order === unit_order) {
                unitId = this.state.units[i].id;
                unitTitle = this.state.units[i].unit_title;
                break;
            }
        }

        this.setState({ currentUnitIndex: unit_order });
        this.setState({ currentUnitTitle: unitTitle });
        this.getUnitSteps(this.state.courseId, this.state.lectureId, unitId);
    }

    onClickNext = () => {
        // 현재 Unit에서 다음 Step이 있으면 -> 다음 Step으로 이동
        // 현재 Unit에서 다음 Step이 없으면 -> 다음 Unit으로 이동.
        // 다음 Unit이 없으면 강의 끝
        toast.info("onClickNext");

        if  (this.state.currentStep === this.state.steps.length) {
            if (this.state.currentUnitIndex === this.state.units.length) {
                toast.info("Nothing to do.");
            } else {
                toast.info("need to go to the next unit.");
                this.selectCurrentUnit(this.state.currentUnitIndex + 1);
            }
        } else {
            this.setState({ currentStep : this.state.currentStep + 1 }); 
        }      
    }

    onClickPrevious = () => {
        // 현재 Unit에서 이전 Step이 있으면 -> 이전 Step으로 이동
        // 현재 Unit에 이전 Step이 없으면 -> 이전 Unit으로 이동
        // 이전 Unit도 없으면 do nothing
        toast.info("onClickPrevious");
        if  (this.state.currentStep === 1) {
            if (this.state.currentUnit === 1) {
                toast.info("Nothing to do.");
            } else {
                toast.info("need to go to the previous unit.");
                this.selectCurrentUnit(this.state.currentUnitIndex - 1);
            }
        } else {
            this.setState({ currentStep : this.state.currentStep - 1 }); 
        }
    }

    onClickUnit = (event) => {
        // TODO: need to get which unit is clicked
        toast.info("onClickUnit:" + event.target.value);
        this.selectCurrentUnit(event.target.value);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <TitleBar className="Basic Korean 101" lectureId="1" lectureTitle="Lecture 01" />
                    <div className="row"><br /></div>
                    <div className="row">
                        <div className="col-6">
                            <Sumerian />
                        </div>
                        <div className="col-6">
                            <div>{this.state.steps && this.state.currentUnitTitle + ' ' + this.state.currentStep + '/' + this.state.steps.length} </div>
                            <Whiteboard type={"textbook"} />
                        </div>
                    </div>
                    <br /><br />
                    <Navigator onClickNext={this.onClickNext} onClickPrevious={this.onClickPrevious} />
                    <br /><br />
                    <UnitList onClickUnit={this.onClickUnit} units={this.state.units} loading={this.state.loading} currentUnitIndex={this.state.currentUnitIndex} />
                </div>
                <ToastContainer position="bottom-right" autoClose="3000" />
                <br /><br />
            </div>
        );
    }
}

export default ClassroomComponent;