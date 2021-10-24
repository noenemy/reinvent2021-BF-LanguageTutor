import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnitList from './UnitList';
import TitleBar from './TitleBar';
import TutorViewer from './TutorViewer';
import TextbookViewer from './TextbookViewer';
import Navigator from './Navigator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class ClassroomComponent extends Component {
    static propTypes = {
        language: "English",
        class: "Basic",
        unit: "1", 
        step: "1"
    }

    state = {
        units: null,
        currentUnit: null,
        steps: null,
        currentStep: null,
        language: "english",
        lectures: null,
        loading: false
    };

    componentDidMount() {
        this.getLectureUnits();
        if (this.state.currentUnit == null) {
            this.setState({ currentUnit: 1 }); // set default unit
        
            const id = window.addEventListener('message', this.handleChildMessage);
        }
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
            
        // TODO : 첫번째 강의를 시작해본다.
        this.speakTeacher('Hello, My name is Cristine');
        await sleep(2500);
        this.speakGuest('안녕하세요. 저는 서연이에요.');
        await sleep(3800);
        this.speakTeacher('Do you wanna learn Korean language fun?We will bring you an exiting Korean lesson.');
        await sleep(5000);
        this.speakTeacher('This class is not only easy and fun. but also you can learn practical expressions and vocabulary.');
        await sleep(6000);
        this.speakGuest('같이 재밌게 공부해봐요.');
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
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/course/lectures/units?courseId=${courseId}&lectureId=${lectureId}`;
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res !== null) {
            this.setState({ units: res.data.units });
            this.setState({ steps: [1, 2, 3], currentStep: 1 });
            console.log(res.data.units);
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    selectCurrentUnit = (unit_id) => {
        this.setState({ currentUnit: unit_id });
        this.setState({ steps: [1, 2, 3, 4], currentStep: 1 });
    }

    onClickNext = () => {
        // 현재 Unit에서 다음 Step이 있으면 -> 다음 Step으로 이동
        // 현재 Unit에서 다음 Step이 없으면 -> 다음 Unit으로 이동.
        // 다음 Unit이 없으면 강의 끝
        toast.info("onClickNext");

        if  (this.state.currentStep === this.state.steps.length) {
            if (this.state.currentUnit === this.state.units.length) {
                toast.info("Nothing to do.");
            } else {
                toast.info("need to go to the next unit.");
                this.selectCurrentUnit(this.state.currentUnit + 1);
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
                this.selectCurrentUnit(this.state.currentUnit - 1);
            }
        } else {
            this.setState({ currentStep : this.state.currentStep - 1 }); 
        }
    }

    onClickUnit = (event) => {
        // TODO: need to get which unit is clicked
        toast.info("onClickUnit:" + event.target.value);
        this.setState({ currentUnit: event.target.value });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <TitleBar className="Basic Korean 101" lectureId="1" lectureTitle="Lecture 01" />
                    <div className="row"><br /></div>
                    <div className="row">
                        <div className="col-6">
                            <TutorViewer />
                        </div>
                        <div className="col-6">
                            <div>{this.state.steps && this.state.currentStep + '/' + this.state.steps.length} </div>
                            <TextbookViewer />
                        </div>
                    </div>
                    <Navigator onClickNext={this.onClickNext} onClickPrevious={this.onClickPrevious} />
                    <UnitList onClickUnit={this.onClickUnit} units={this.state.units} loading={this.state.loading} selectedUnit={this.state.currentUnit} />
                </div>
                <ToastContainer position="bottom-right" autoClose="3000" />
            </div>
        );
    }
}

export default ClassroomComponent;