import React, { Component } from 'react';
import Webcam from "react-webcam";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class Rekognition extends Component {
    constructor(props) {
        super(props);
        this.webcamRef = React.createRef()
        this.state = {
            screenshot: null,
            labels: null,
            loading: false
        }
    }

    componentDidMount() {
    }

    async postImage() {
        // call a demo API here
        const formData = new FormData();
        formData.append('image', this.state.screenshot);

        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/demo/rekognition`;
        const res = await axios.post(backendAPI, formData);
        this.setState({ loading: false });

        if (res !== null) {
            this.setState({ labels: res.data.Labels });
            var found = false;

            for (var i in res.data.Labels) {
                console.log(res.data.Labels[i].Name);
                if (res.data.Labels[i].Name === this.props.content.answer) {
                    found = true;
                    break;
                }
            }

            if (found === true) {
                this.props.onCorrect();
            } else {
                this.props.onWrong();
            }

            console.log(res.data.Labels);
        }
        else {
            toast.error("something wrong! try again.");
        }        
    }

    capture = () => {

        const screenshot = this.webcamRef.current.getScreenshot();
        this.setState({ screenshot }, () => {
            this.postImage();
        });
    }

    render() {

        const videoConstraints = {
            width: 400,
            height: 340,
            facingMode: "user"
        };

        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-5 text-center">
                            <br />
                            <h6><i className="fas fa-question-circle"></i> &nbsp; 
                            Find the picture card that matches the word below.</h6>
                            <br /><br /><br />
                            <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="One of the fruits rich in vitamins">
                                <h1>{this.props.content.given_word}</h1>
                            </button>
                            <br /><br />
                        </div>
                        <div className="col-7">

                            <div className="text-center">
                            <Webcam
                                ref={this.webcamRef}
                                audio={false}
                                height={340}
                                screenshotFormat="image/png"
                                width={430}
                                videoConstraints={videoConstraints}
                            />
                            
                                <br/>
                                <button id="buttonSnapshot" className="btn btn-primary mr-2" onClick={this.capture}>Take a Snapshot</button>
                                <br/>
                            
                            </div>
                            <br />
                            {this.state.loading ? <h4>Checking answer...</h4> : <h4>&nbsp;</h4>}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Rekognition;