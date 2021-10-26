import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Button } from "react-bootstrap";
import LoadScreen from '../../assets/images/load_screen.png'

class LearningComponent extends Component {
    state = {
        selectedCourseId: "ef717ea27fc4426b99e484343a493e5a", // Korean 101
        courses: null,
        lectures: null,
        loading: false
    };

    componentDidMount() {
        this.getLectures(this.state.selectedCourseId);
    }

    selectCourse = (courseId) => {
        this.setState({ selectedCourseId: courseId });
    }

    async getCourses() {
        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/courses`;
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res != null && res.data.listCourses != null) {
            this.setState({ courses: res.data.listCourses.items });
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    async getLectures(courseId=1) {
        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/courses/${courseId}/lectures`;
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res != null && res.data.listCourses != null) {
            this.setState({ lectures: res.data.listCourses.items });
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    enterClassroom = (lectureId) => {
        window.location.href = `/classroom?courseId=${this.state.selectedCourseId}&lectureId=${lectureId}`;
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <br /><br />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <img className="img-fluid" src={LoadScreen} width="500" height="400"></img>
                        </div>
                        <div className="col-6">
                            <br /><br />
                            <h2>
                                <i class="fas fa-quote-left" />&nbsp;
                                Hi, we are your language tutors.
                            </h2>
                            <h2>Learning a language is fun. </h2>
                            <h2>We will help you. <i class="fas fa-quote-right" />&nbsp;
                            </h2>
                            <br /><br />
    
                            <h2>Which language do you want to learn?</h2>
                            <Button onClick={this.selectCourse}><i class="fas fa-globe-asia" />&nbsp;Korean</Button> 
                            &nbsp;                            
                            <Button onClick={this.selectCourse} disabled className="btn-secondary"><i class="fas fa-globe-americas" />&nbsp;English</Button> 
                            &nbsp;
                            <Button onClick={this.selectCourse} disabled className="btn-secondary"><i class="fas fa-globe-europe" />&nbsp;Spanish</Button> 
                            &nbsp; 
                            <Button onClick={this.selectCourse} disabled className="btn-secondary"><i class="fas fa-globe-asia" />&nbsp;Chinese</Button> 
                            &nbsp;
                            <Button onClick={this.selectCourse} disabled className="btn-secondary"><i class="fas fa-globe-asia" />&nbsp;Japanese</Button>     
                            <br /><br />
                            <h2>Which subject do you want to learn today?</h2>

                            <div className="list-group">
                                <button type="button" className="list-group-item list-group-item-action list-group-item-secondary" aria-current="true">
                                    Course content
                                </button>
                                {this.state.lectures && this.state.lectures.map(( lecture, index) => {
                                    return (
                                        <button type="button" className="list-group-item list-group-item-action" key={lecture.id} onClick={() => this.enterClassroom(lecture.id)}>
                                            <i class="fas fa-book" />&nbsp;{ lecture.lecture_title }
                                        </button>
                                        );
                                })}

                            </div>
                        </div>
                    </div>
                    <div className="row"> 
    
                    </div>
                </div>
    
            </div>
          );
    }

};

export default LearningComponent;
