import React from 'react';
import { Button } from "react-bootstrap";

const LearningComponent = () => {

    return(
        <div>
            <h1>Learning</h1>
            <ul>
                <li>Hi, my name is Tutty. </li>
                <li>What is your name?</li>
                Name: <input type="text" name="name" />
                <li>What language do you want to learn?</li>
                <Button>English</Button> 
                <Button>Korean</Button> 
                <Button>Spanish</Button> 
                <li>What subject do you want to learn today?</li>
                <Button>Fruits</Button> 
                <Button>Animals</Button> 
                <Button>Greetings</Button> 
            </ul>
            <Button>Meet the tutor!</Button> 
        </div>
      );
};

export default LearningComponent;
