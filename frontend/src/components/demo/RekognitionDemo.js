import React, { Component } from 'react';
import Webcam from "react-webcam";

class RekognitionDemo extends Component {
    constructor(props) {
        super(props);
        this.webcamRef = React.createRef()
        this.state = {
            screenshot: null,
            labels: null
        }
    }

    capture = () => {
        console.log(this.webcamRef);
        const screenshot = this.webcamRef.current.getScreenshot();
        this.setState({ screenshot });
        this.postImage();
    }

    postImage = () => {
        // call a demo API here
    }

    render() {

        const videoConstraints = {
            width: 650,
            height: 520,
            facingMode: "user"
        };

        return (
            <div>
                <br></br>
                <h1 className="text-secondary text-center">Object Detection with AWS Rekognition</h1>
                <br></br>

                <div className="container">
                    <div className="row">
                        <div className="col-8">

                            <div className="text-center">
                            <Webcam
                                ref={this.webcamRef}
                                audio={false}
                                height={350}
                                screenshotFormat="image/jpeg"
                                width={350}
                                videoConstraints={videoConstraints}
                            />
                            
                                <br/><br/>
                                <button id="buttonSnapshot" className="btn btn-primary mr-2" onClick={this.capture}>Take A Snapshot</button>
                                <br/>
                            
                            </div>
                            {this.state.screenshot ? <img src={this.state.screenshot} /> : null}
                        </div>

                        {this.state.labels && 
                        <div className="col-4">
                            <div>
                                <h5>Found objects : </h5>
                            </div>
                            <div className="container">
                                <table className="table">
                                <tr className="thead-light">
                                    <th>Label</th>  
                                    <th>Confidence</th>
                                </tr>
                                {this.state.labels.map(( label, index) => {
                                    return (
                                    <tr key={index}>
                                        <td>{ label.name }</td>
                                        <td>{ label.confidence }</td>
                                    </tr>
                                );
                                })}
                                </table>
                            </div>
                        </div>
                        }   
                    </div>
                </div>

            </div>
        );
    }
}

export default RekognitionDemo;