import React, { Component } from 'react';
import { Button } from "react-bootstrap";
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
                        <div className="col-6">
                            <img className="img-fluid" src={LoadScreen} width="500" height="400"></img>
                        </div>
                        <div className="col-6">
                            <br />
                            <h2>Hi, my name is Tutty. I'm your language tutor.</h2>
                            <br /><br />
    
                            <h2>What language do you want to learn?</h2>
                            <Button onClick={this.selectLanguage}>English</Button> 
                            <Button onClick={this.selectLanguage}>Korean</Button> 
                            <Button onClick={this.selectLanguage}>Spanish</Button> 
                            <br /><br />
                            <h2>What subject do you want to learn today?</h2>
                            <Button onClick={this.enterClassroom}>Fruits</Button> 
                            <Button onClick={this.enterClassroom}>Animals</Button> 
                            <Button onClick={this.enterClassroom}>Greetings</Button> 
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
