import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TutorImage from '../../assets/images/classroom-tutor-sample.png'

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
                        <div className="col-3">
                            <a href="#" onClick={this.goLearningHome}>Home</a> - 
                            Class: {this.props.language} {this.props.class}
                        </div>
                        <div className="col-9">
                            <h3>Unit {this.props.unit} 1. Title here</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <img className="img-fluid" src={TutorImage}></img>
                        </div>
                        <div className="col-6">
                            <h2>col-4</h2>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            <br /><br />
                            Contents types : text, image+text, object detection, textract, transcribe, ....
                        </div>
                    </div>
                    <div className="row">
                        <br /><br />
                    </div>
                    <div className="row">
                        <ul className="list-group list-group-horizontal">
                            <li className="list-group-item flex-fill list-group-item-secondary"><strong>1. Introduction</strong></li>
                            <li className="list-group-item flex-fill">2. Expressions</li>
                            <li className="list-group-item flex-fill">3. Vocabulary</li>
                            <li className="list-group-item flex-fill">4. Quiz</li>
                            <li className="list-group-item flex-fill">5. Summary</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassroomComponent;