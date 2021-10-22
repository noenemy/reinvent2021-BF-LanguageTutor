import React, { Component } from 'react';
import TutorImage from '../../assets/images/classroom-tutor-sample.png'

class TutorViewer extends Component {
    render() {
        return (
            <div>
                <img className="img-fluid" src={TutorImage}></img>
            </div>
        );
    }
}

export default TutorViewer;