import React, { Component } from 'react';
import Webcam from "react-webcam";

class RekognitionDemo extends Component {
    setRef = webcam => {
        this.webcam = webcam;
    };

    render() {

        const videoConstraints = {
            width: 650,
            height: 520,
            facingMode: "user"
        };

        return (
            <div>
                <br></br>
                <h1 class="text-secondary text-center">Object Detection with AWS Rekognition</h1>
                <br></br>

                <div class="container">
                    <div class="row">
                        <div class="col-8">

                            <div class="text-center">
                            <Webcam
                                audio={false}
                                height={350}
                                ref={this.setRef}
                                screenshotFormat="image/jpeg"
                                width={350}
                                videoConstraints={videoConstraints}
                            />
                            
                                <br/><br/>
                                <button id="buttonSnapshot" class="btn btn-primary mr-2" click="triggerSnapshot();">Take A Snapshot</button>
                                <br/>
                            
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default RekognitionDemo;