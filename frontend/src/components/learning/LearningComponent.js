import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from "react-bootstrap";
import LoadScreen from '../../assets/images/load_screen.png'

class LearningComponent extends Component {

    routeChange = () => {
        // todo
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
                            <Button>English</Button> 
                            <Button>Korean</Button> 
                            <Button>Spanish</Button> 
                            <br /><br />
                            <h2>What subject do you want to learn today?</h2>
                            <Button onClick={this.routeChange}>Fruits</Button> 
                            <Button>Animals</Button> 
                            <Button>Greetings</Button> 
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
