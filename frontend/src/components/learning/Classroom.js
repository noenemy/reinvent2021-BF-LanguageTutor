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
        lectureTitle: "",
        units: null,
        currentUnitIndex: null,
        currentUnitTitle: null,
        content: null,
        steps: null,
        currentStep: null,
        sumerianIsReady: false,
        loading: false
    };

    componentDidMount() {
        const current = decodeURI(window.location.href);
        const search = current.split("?")[1];
        const params = new URLSearchParams(search);
        const courseId = params.get('courseId');
        const lectureId = params.get('lectureId');
        this.getLectureInfo(courseId, lectureId);
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
            this.setState({ sumerianIsReady: true}, () => {
                this.startLearning();
            })
        }
    }

    async startLearning() {

        if (this.state.sumerianIsReady === false) {
            console.log("sumerian is not ready yet.");
            return;
        }

        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }

        // stop previous speaking 
        this.muteTeacher();
        this.muteGuest();

        await sleep(1000);

        const step = this.state.steps[this.state.currentStep];
        //console.log('current step content:' + step.content);

        // TODO: need to find a way to stop speaking when the user moves to other contents
        this.setState({ content: step.content });
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

    muteTeacher() {
        const msg = {
            'type': 'stop',
            'host': 'Alien',
            'dialog': ''
        };

        const sumerian = document.getElementById('sumerianHost');
        sumerian.contentWindow.postMessage(msg, '*');
    }

    muteGuest() {
        const msg = {
            'type': 'stop',
            'host': 'Luke',
            'dialog': ''
        };

        const sumerian = document.getElementById('sumerianHost');
        sumerian.contentWindow.postMessage(msg, '*');
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

    async getLectureInfo(courseId=1, lectureId=1) {
        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/courses/${courseId}/lectures/${lectureId}`;
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res != null && res.data.listCourses != null) {
            this.setState({ lectureTitle: res.data.listCourses.items.lecture_title });
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    async getLectureUnits(courseId=1, lectureId=1) {

        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/courses/${courseId}/lectures/${lectureId}/units`;
        //console.log(backendAPI);
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res != null && res.data.listCourses != null) {
            this.setState({ units: res.data.listCourses.items }, () => {
                this.selectCurrentUnit(1, true); // set default unit
            });
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    async getUnitSteps(courseId=1, lectureId=1, unitId=1, forward=true) {

        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/courses/${courseId}/lectures/${lectureId}/units/${unitId}/steps`;
        console.log(backendAPI);
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        console.log(res.data);
        if (res != null && res.data.steps != null) {
            var step = 0;
            if (forward == false) {
                step = res.data.steps.length - 1;
            }
            this.setState({ steps: res.data.steps, currentStep: step }, ()=> {
                this.startLearning();
            });
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    // TODO: need to check if there's proper gesture to show more interactely
    onCorrect = () => {
        this.speakTeacher(`<speak><amazon:domain name="news"><prosody rate="110%" volume="loud"><amazon:effect name="drc">Nice!!! That's correct.</amazon:effect></prosody></amazon:domain></speak>`);
        toast.info("Nice!!! That's correct.");
    }

    onWrong = () => {
        this.speakTeacher(`<speak><amazon:domain name="news"><prosody rate="110%" volume="loud"><amazon:effect name="drc">Sorry. Try again!</amazon:effect></prosody></amazon:domain></speak>`);
        toast.info("Sorry. Try again!");
    }

    selectCurrentUnit = (unit_order, forward=true) => {

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
        this.getUnitSteps(this.state.courseId, this.state.lectureId, unitId, forward);
    }

    onClickNext = () => {
        // 현재 Unit에서 다음 Step이 있으면 -> 다음 Step으로 이동
        // 현재 Unit에서 다음 Step이 없으면 -> 다음 Unit으로 이동.
        // 다음 Unit이 없으면 강의 끝
        //console.log(`onClickNext currentStep:${this.state.currentStep} steps.length:${this.state.steps.length} currentUnitIndex:${this.state.currentUnitIndex}`);

        if  (this.state.currentStep === this.state.steps.length - 1) {
            if (this.state.currentUnitIndex === this.state.units.length) {
                console.log("onClickNext : Nothing to do.");
            } else {
                toast.info("need to go to the next unit.");
                this.selectCurrentUnit(this.state.currentUnitIndex + 1, true);
            }
        } else {
            this.setState({ currentStep : this.state.currentStep + 1 }, () => {
                this.startLearning();
            }); 
        }      
    }

    onClickPrevious = () => {
        // 현재 Unit에서 이전 Step이 있으면 -> 이전 Step으로 이동
        // 현재 Unit에 이전 Step이 없으면 -> 이전 Unit으로 이동
        // 이전 Unit도 없으면 do nothing
        console.log(`onClickPrevious currentStep:${this.state.currentStep} steps.length:${this.state.steps.length} currentUnitIndex:${this.state.currentUnitIndex}`);

        if  (this.state.currentStep === 0) {
            if (this.state.currentUnit === 1) {
                console.log("onClickPrevious. Nothing to do.");
            } else {
                toast.info("need to go to the previous unit.");
                this.selectCurrentUnit(this.state.currentUnitIndex - 1, false);
            }
        } else {
            this.setState({ currentStep : this.state.currentStep - 1 }, () => {
                this.startLearning();
            }); 
        }
    }

    onClickUnit = (event) => {
        toast.info("onClickUnit:" + event.target.value);
        this.selectCurrentUnit(event.target.value, true);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <TitleBar className="Basic Korean 101" lectureId={this.state.lectureId} lectureTitle={this.state.lectureTitle} />
                    <div className="row"><br /></div>
                    <div className="row">
                        <div className="col-6">
                            <Sumerian />
                        </div>
                        <div className="col-6">
                            <h5>{this.state.steps && this.state.currentUnitTitle}</h5>
                            <hr />
                            <Whiteboard content={this.state.content} onCorrect={this.onCorrect} onWrong={this.onWrong}/>
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