import React, { Component } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPlayCircle, faCamera } from '@fortawesome/free-solid-svg-icons'

class HomeComponent extends Component {


    goLearning = () => {
        window.location.href = '/learning';
    }
    
    render() {
        return ( 
            <div>

                <div className="jumbotron jumbotron-fluid" id="banner" >
                    <div className="container text-center text-md-left">
                        <header>
                            <div className="row justify-content-between">
                                <div className="col-11">
                                </div>
                                <div className="col-1 align-self-center text-right">
                                    <img src="../../assets/images/builders_logo.jpg" alt="logo" />
                                </div>
                            </div>
                        </header>
                    </div>
                    <div className="row text-left">
                        <div className="col-1"></div>
                            <div className="col">
                            <div className="text-left">
                                <h1 data-aos="fade" data-aos-easing="linear" data-aos-duration="1000" data-aos-once="true" class="display-3 text-black-60 font-weight-bold">
                                    Welcome to<br />
                                    1:1 Language Tutor using AWS AI/ML
                                </h1>
                                <div className="row">
                                    <p id="p1" data-aos="fade" data-aos-easing="linear" data-aos-duration="1000" data-aos-once="true" class="lead bg-dark text-white my-4">
                                        &nbsp;Online tutoring service to learn languages with AWS AI/ML&nbsp;
                                    </p>
                                </div>
                                <br />
                                &nbsp;
                                <button className="btn btn-primary btn-lg" aria-label="Left" onClick={this.goLearning}>
                                    <FontAwesomeIcon icon={faPlayCircle} /> Get Started
                                </button>
                                &nbsp;
                                <button className="btn btn-primary btn-lg ml-4" aria-label="Left" onClick={this.playTrailer}>
                                    <FontAwesomeIcon icon={faCamera} /> <i fa name="video-camera"></i> Watch Trailer
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="container my-4 py-2">
                        <h2 className="text-center font-weight-bold my-3">Project Abstract</h2>
                        <div className="row text-center">
                            <div>
                                <h4></h4>
                                <h4>Boost your language learning with AWS AI/ML services.</h4>
                                <h4>AWS AI / ML services are the perfect technologies to help users read, write, and speak foreign languages.</h4>
                                <br />
                            </div>

                            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" data-aos-once="true" class="col-2 text-center">
                                <img src="../../assets/images/react_logo.png" alt="React" height="100" class="mx-auto" />
                                <br /><br />
                                <h4>React</h4>
                                <p>Front-end web framework</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" data-aos-once="true" class="col-2 text-center">
                                <img src="../../assets/images/flask_logo.png" alt="Python" height="100" class="mx-auto" />
                                <br /><br />
                                <h4>Flask</h4>
                                <p>Middle-tier API service</p>
                            </div>    
                            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" data-aos-once="true" class="col-2 text-center">
                                <img src="../../assets/images/icon-rekognition.jpg" alt="Amazon Rekognition" height="100" class="mx-auto" />
                                <br />
                                <h4>Amazon<br />Rekognition</h4>
                                <p>Visual Analysis</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" data-aos-once="true" class="col-2 text-center">
                                <img src="../../assets/images/icon-textract.jpg" alt="Amazon Rekognition" height="100" class="mx-auto" />
                                <br />
                                <h4>Amazon<br />Textract</h4>
                                <p>Extract Text (OCR)</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" data-aos-once="true" class="col-2 text-center">
                                <img src="../../assets/images/icon-polly.jpg" alt="Amazon Rekognition" height="100" class="mx-auto" />
                                <br />
                                <h4>Amazon<br />Polly</h4>
                                <p>Text To Speech (TTS)</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" data-aos-once="true" class="col-2 text-center">
                                <img src="../../assets/images/icon-transcribe.jpg" alt="Amazon Rekognition" height="100" class="mx-auto" />
                                <br />
                                <h4>Amazon<br />Transcribe</h4>
                                <p>Speech Recognition</p>
                            </div>
                        </div>
                    </div>


                    <div className="jumbotron jumbotron-fluid feature" id="feature-first">
                        <div className="container my-5">
                            <div className="row justify-content-between text-center text-md-left">
                                <div data-aos="fade-right" data-aos-duration="1000" data-aos-once="true" class="col-md-6">
                                    <h2 className="font-weight-bold">Amazon Rekognition</h2>
                                    <h4 className="my-4">With Amazon Rekognition, you can identify thousands of objects (e.g. bike, telephone, building) and scenes (e.g. parking lot, beach, city). When analyzing video, you can also identify specific activities happening in the frame, such as "delivering a package" or "playing soccer".</h4>
                                    <a href="https://aws.amazon.com/rekognition/" target="_blank" class="btn btn-primary btn-lg">
                                        <FontAwesomeIcon icon={faInfoCircle} />&nbsp; Learn More</a>
                                </div>
                                <div data-aos="fade-left" data-aos-duration="1000" data-aos-once="true" class="col-md-6 align-self-center">
                                    <img src="../../assets/images/label-detection-sample.png" width="600" alt="label detection" class="mx-auto d-block" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <div className="container">
                            <h2 className="text-center font-weight-bold my-5">Architecture Diagram</h2>
                        </div>
                        <div>
                            <div className="row text-center">
                                <div data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000" data-aos-once="true" class="col text-center">
                                    <img src="../../assets/images/diagram.png" alt="Architecture Diagram" height="750" class="mx-auto text-center" />
                                </div>
                            </div>
                            <br /><br />
                        </div>
                    </div>



                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">

                            <h2 className="text-center font-weight-bold">Meet the Team</h2>
                            <br />
                            <div className="row">
                                <div className="col-2"></div>

                                <div className="col-2">
                                    <div className="card">
                                    <img src="../../assets/images/team/skkim.jpeg" alt="Jane" />
                                    <div className="container">
                                        <h4>Soonkeun Kim</h4>
                                        <p className="title">Project Owner</p>
                                        <p>A garage rocker.<br />Full stack development for Front-end and API services including artworks.</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-1"></div>

                                <div className="col-2">
                                    <div className="card">
                                    <img src="../../assets/images/team/ssjou.jpeg" alt="Sungshik" />
                                    <div className="container">
                                        <h4>Sungshik Jou</h4>
                                        <p className="title">Project Partner</p>
                                        <p>The yak shaver.<br />Contribution for architecture design, game ranking and deployment.</p>
                                    </div>
                                    </div>
                                </div>   
                                <div className="col-1"></div>                             
                                <div className="col-2">
                                    <div className="card">
                                    <img src="../../assets/images/team/jwcho.jpeg" alt="Jiwoon" />
                                    <div className="container">
                                        <h4>Jiwoon Cho</h4>
                                        <p className="title">Project Partner</p>
                                        <p>Dad with 3 kids.<br />Contribution for overall architecure design, research and deployment.</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-2"></div>

                            </div>
                        </div>
                    </div>

                </div>  
            </div>
        );
    }
};

export default HomeComponent;
