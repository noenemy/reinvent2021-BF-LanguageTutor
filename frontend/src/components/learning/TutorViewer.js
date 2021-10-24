import React, { Component } from 'react';
import TutorImage from '../../assets/images/classroom-tutor-sample.png'

class TutorViewer extends Component {

    
    render() {
        return (
            <div>
                <iframe id='sumerianHost' src="/three.html" width="640" height="400" />
            </div>
        );
    }
}

export default TutorViewer;