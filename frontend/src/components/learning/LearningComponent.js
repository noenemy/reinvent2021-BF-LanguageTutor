import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import LoadScreen from '../../assets/images/load_screen.png'

class LearningComponent extends Component {
    state = {
        language: "english"
    };

    selectLanguage = () => {
        this.setState({ language: 'english' });
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
                                <button type="button" className="list-group-item list-group-item-action" onClick={this.enterClassroom}>
                                    <FontAwesomeIcon icon={faBook} />&nbsp;
                                    Unit 1. Day 1
                                </button>
                                <button type="button" className="list-group-item list-group-item-action" disabled>
                                    <FontAwesomeIcon icon={faBook} />&nbsp;
                                    Unit 2. Day 2
                                </button>
                                <button type="button" className="list-group-item list-group-item-action" disabled>
                                    <FontAwesomeIcon icon={faBook} />&nbsp;
                                    Unit 3. Day 3
                                </button>
                                <button type="button" className="list-group-item list-group-item-action" disabled>
                                    <FontAwesomeIcon icon={faBook} />&nbsp;
                                    Unit 4. Day 4
                                </button>
                                <button type="button" className="list-group-item list-group-item-action" disabled>
                                    <FontAwesomeIcon icon={faBook} />&nbsp;
                                    Unit 5. Day 5
                                </button>
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
