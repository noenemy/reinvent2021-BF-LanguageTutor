import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnitList from './UnitList';
import TitleBar from './TitleBar';
import TutorViewer from './TutorViewer';
import LectureViewer from './LectureViewer';

class ClassroomComponent extends Component {
    static propTypes = {
        language: "English",
        class: "Basic",
        unit: "1", 
        step: "1"
    }

    goLearningHome = () => {
        window.location.href = "/learning";
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <TitleBar />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <TutorViewer />
                        </div>
                        <div className="col-6">
                            <LectureViewer />
                        </div>
                    </div>
                    <div className="row">
                        <br /><br />
                    </div>
                    <div className="row">
                        <UnitList />
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassroomComponent;