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
        language: "english",
        lectures: null,
        loading: false
    };

    componentDidMount() {
        this.getLectureUnits();
    }

    async getLectureUnits(courseId=1, lectureId=1) {
        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/course/lectures/units?courseId=${courseId}&lectureId=${lectureId}`;
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res !== null) {
            this.setState({ units: res.data.units });
            console.log(res.data.units);
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    onClickNext() {
        // 현재 Unit에서 다음 Step이 있으면 -> 다음 Step으로 이동
        // 현재 Unit에서 다음 Step이 없으면 -> 다음 Unit으로 이동.
        // 다음 Unit이 없으면 강의 끝
        alert("onClickNext");
    }

    onClickPrevious() {
        // 현재 Unit에서 이전 Step이 있으면 -> 이전 Step으로 이동
        // 현재 Unit에 이전 Step이 없으면 -> 이전 Unit으로 이동
        // 이전 Unit도 없으면 do nothing
        alert("onClickPrevious");
    }

    onClickUnit = (event) => {
        // TODO: need to get which unit is clicked
        alert("onClickUnit:" + event.target.value);
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
                            <TextbookViewer />
                        </div>
                    </div>
                    <Navigator onClickNext={this.onClickNext} onClickPrevious={this.onClickPrevious} />
                    <UnitList onClickUnit={this.onClickUnit} units={this.state.units} loading={this.state.loading} />
                </div>
            </div>
        );
    }
}

export default ClassroomComponent;