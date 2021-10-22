import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import LoadScreen from '../../assets/images/load_screen.png'

class LearningComponent extends Component {
    state = {
        language: "english",
        lectures: null,
        loading: false
    };

    componentDidMount() {
        this.getLectures();
    }

    selectLanguage = () => {
        this.setState({ language: 'english' });
    }

    async getLectures(courseId=1) {
        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/course/lectures?courseId=${courseId}`;
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res !== null) {
            this.setState({ lectures: res.data.lectures });
            console.log(res.data.lectures);
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    enterClassroom = (classId) => {
        window.location.href = `/classroom?language=${this.state.language}&class=${classId}`;
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
                                <FontAwesomeIcon icon={faQuoteLeft} />&nbsp;
                                Hi, we are your language tutors.
                            </h2>
                            <h2>Learning a language is fun. </h2>
                            <h2>We will help you. <FontAwesomeIcon icon={faQuoteRight} />&nbsp;
                            </h2>
                            <br /><br />
    
                            <h2>Which language do you want to learn?</h2>
                            <Button onClick={this.selectLanguage} disabled>English</Button> 
                            &nbsp;
                            <Button onClick={this.selectLanguage}>Korean</Button> 
                            &nbsp;
                            <Button onClick={this.selectLanguage} disabled>Spanish</Button> 
                            <br /><br />
                            <h2>Which subject do you want to learn today?</h2>

                            <div className="list-group">
                                <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                                    Course content
                                </button>
                                {this.state.lectures && this.state.lectures.map(( lecture, index) => {
                                    return (
                                        <button type="button" className="list-group-item list-group-item-action" key={lecture.lecture_id} onClick={this.enterClassroom}>
                                            <FontAwesomeIcon icon={faBook} />&nbsp;
                                            Lecture { lecture.lecture_id}. { lecture.lecture_title }
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
