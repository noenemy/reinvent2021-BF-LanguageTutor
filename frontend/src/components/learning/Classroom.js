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
import queryString from 'query-string';

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

        this.getLectureUnits(courseId, lectureId);
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
        this.speakTeacher(`<speak><amazon:domain name="news"><prosody rate="110%"><amazon:effect name="drc">Hello, My name is Joanna. nice to meet you!</amazon:effect></prosody></amazon:domain></speak>`);
        await sleep(3100);
        this.speakGuest(`<speak><prosody rate="125%" pitch ="10%"><amazon:effect vocal-tract-length="+10%"><amazon:effect name="drc">
        <amazon:breath duration="medium" volume="x-loud"/>안녕하세요! 저는 한국어 선생님<break time="50ms"/>
        <amazon:breath duration="medium" volume="soft"/>
        <emphasis level="moderate">김서현이에요! </emphasis>
        <amazon:breath duration="medium" volume="soft"/>
        만나서 반갑습니다!</amazon:effect></amazon:effect></prosody></speak>`);
        await sleep(6500);
        this.speakTeacher(`<speak><amazon:domain name="news"><prosody rate="110%"><amazon:effect name="drc">Do you wanna learn Korean language fun?
        We will bring you an exciting Korean lesson.</amazon:effect></prosody></amazon:domain></speak>`);
        await sleep(5000);
        this.speakGuest(`<speak>
        <prosody rate="125%" pitch ="10%"><amazon:effect vocal-tract-length="+10%"><amazon:effect name="drc">
        <amazon:breath duration="medium" volume="soft"/>
        <p><prosody rate="120%"> 이제 저희와 함께?</prosody></p> <break time="10ms"/> 한국어를 배워봐요?
        <break time="100ms"/>
        <amazon:breath duration="medium" volume="soft"/>
        </amazon:effect></amazon:effect></prosody>
        </speak>`);
        await sleep(5200);
        this.speakTeacher(`<speak><amazon:domain name="news"><prosody rate="110%"><amazon:effect name="drc">Let's get start it.</amazon:effect></prosody></amazon:domain></speak>`);
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
        console.log(backendAPI);
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res != null && res.data.listCourses != null) {
            this.setState({ units: res.data.listCourses.items });
            this.setState({ steps: [1, 2, 3], currentStep: 1 });
            console.log(res.data.units);
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    async getUnitSteps(courseId=1, lectureId=1, unitId=1) {
        // TODO: get lecture steps here!
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
        const unitTitle = this.state.units[event.target.value-1].unit_title;
        this.setState({ currentUnitTitle: unitTitle });
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
                            <div>{this.state.steps && this.state.currentUnitTitle + ' ' + this.state.currentStep + '/' + this.state.steps.length} </div>
                            <TextbookViewer />
                        </div>
                    </div>
                    <br /><br />
                    <Navigator onClickNext={this.onClickNext} onClickPrevious={this.onClickPrevious} />
                    <br /><br />
                    <UnitList onClickUnit={this.onClickUnit} units={this.state.units} loading={this.state.loading} selectedUnit={this.state.currentUnit} />
                </div>
                <ToastContainer position="bottom-right" autoClose="3000" />
                <br /><br />
            </div>
        );
    }
}

export default ClassroomComponent;