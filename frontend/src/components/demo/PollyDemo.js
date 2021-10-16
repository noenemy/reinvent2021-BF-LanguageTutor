import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class PollyDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'en-US',
            selectedVoice: null,
            languages: null,
            text: '1:1 Learn Tutor using AWS AI/ML',
            voices: null,
            loading: false,
            playing: false
        }
    }
    audio = new Audio();

    componentDidMount() {
        this.getPollyLanguages();
        this.getPollyVoices('en-US');
        this.audio.addEventListener('ended', () => this.setState({ playing: false }));
    }

    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => this.setState({ playing: false })); 
    }

    async getPollyLanguages() {
        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/demo/polly/languages`;
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res !== null) {
            this.setState({ languages: res.data });
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    async getPollyVoices(languageCode) {

        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/demo/polly/voices?languageCode=${languageCode}`;
        const res = await axios.get(backendAPI);
        this.setState({ loading: false });

        if (res !== null) {
            this.setState({ voices: res.data, selectedVoice: res.data[0].voiceName });
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    languageChanged = (event) => {
        this.setState({ voices: null });
        this.setState({ selectedLanguage: event.target.value });
        this.getPollyVoices(event.target.value);
    }

    voiceChanged = (event) => {
        this.setState({ selectedVoice: event.target.value });
    }

    textChanged = (event) => {
        this.setState({ text: event.target.value });
    }

    speech = (event) => {
        this.pollyDemo()
    }

    async pollyDemo() {
        const formData = new FormData();
        formData.append('language', this.state.selectedLanguage);
        formData.append('voice', this.state.selectedVoice);
        formData.append('text',this.state.text);

        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/demo/polly`;         
        const res = await axios.post(backendAPI, formData);
        this.setState({ loading: false });

        const mediaUrl = res.data.mediaUrl;

        this.audio = new Audio(mediaUrl);
        this.audio.play();
    }

    render() {
        return (
            <div>
                <br />
                <h1 className="text-secondary text-center">TTS with AWS Polly</h1>
                <br />
                <ToastContainer position="bottom-right" autoClose="3000" />
                
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="text-center">
                                <div className="input-group">
                                    <div className="input-group-prepend tts-text">
                                    <span className="input-group-text">Text</span>
                                    </div>
                                    <textarea id="texttospeech" className="form-control" aria-label="With textarea" value={this.state.text} onChange={this.textChanged} />
                                </div>
                                
                                <br/><br/>

                                <button id="buttonSpeech" className="btn btn-primary mr-2" onClick={this.speech}>Listen to Speech</button>
                                <br/>
                                
                            </div>
                        </div>
                        <div className="col-4">
                            {this.state.languages && <div>
                            <label>Language & Region :&nbsp;</label>
                            <select id="selectLanguages" value={this.state.selectedLanguage} onChange={this.languageChanged}>
                                {this.loading && <option value="0">Loading...</option>}
                                {this.state.languages.map(({ languageCode, languageName }, index) =>
                                    <option value={languageCode} key={languageCode}>{languageName}</option>
                                )}
                            </select>
                            </div>}

                            <div>Voice : </div>
                                {this.state.voices && <div className="container">

                                    {this.state.voices.map(({ voiceName, gender }, index) =>
                                    <div className="radio" onChange={this.voiceChanged}>
                                        <label>
                                        <input type="radio" name="radioVoices" id={voiceName} value={voiceName} defaultChecked={index === 0} />
                                        &nbsp;{voiceName}, {gender}
                                        </label>
                                    </div>
                                    )}
                                </div>}

                                {!this.state.voices && <div>&nbsp;&nbsp;&nbsp;&nbsp;Loading ...</div>}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PollyDemo;