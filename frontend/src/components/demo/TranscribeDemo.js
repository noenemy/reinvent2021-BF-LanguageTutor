import React, { Component } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mic from 'microphone-stream';
import { pcmEncode, downsampleBuffer } from '../../util/audioUtils.js';
import { EventStreamMarshaller } from '@aws-sdk/eventstream-marshaller';
import { toUtf8, fromUtf8 } from '@aws-sdk/util-utf8-node';

class TranscribeDemo extends Component {
    constructor(props) {
        super(props);
        this.eventStreamMarshaller = null;
        this.state = {
            selectedLanguage: 'en-US',
            languages: null,            
            text: '',
            streaming: false,
            socket: null
        };
    }

    componentDidMount() {
        this.getTranscribeLanguages();
    }

    async getTranscribeLanguages() {
        this.setState({ loading: true });
        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/demo/transcribe/languages`;
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res !== null) {
            this.setState({ languages: res.data });
        }
        else {
            toast.error("something wrong! try again.");
        }
    }

    languageChanged = (event) => {
        this.setState({ selectedLanguage: event.target.value});
    }
    
    async transcribe() {

        if (this.state.streaming) {
            this.state.socket.close();
            this.setState({ streaming: false });
            return;
        }

        var micStream = null;
        var mediaStream = null;
        var inputSampleRate = 0;
        var transcription = "";
        const transcribeSampleRate = 44100;
        const eventStreamMarshaller = new EventStreamMarshaller(toUtf8, fromUtf8);


        try {
            mediaStream = await window.navigator.mediaDevices.getUserMedia({
                    video: false,
                    audio: true
                })
        }
        catch (error) {
            console.log(error);
            toast.error("Error. Please make sure you allow this website to access your microphone");
            return;
        }

        this.eventStreamMarshaller = new EventStreamMarshaller(toUtf8, fromUtf8);
        //let's get the mic input from the browser, via the microphone-stream module
        micStream = new mic();

        micStream.on("format", data => {
            inputSampleRate = data.sampleRate;
        });

        micStream.setStream(mediaStream);        

        const formData = new FormData();
        formData.append('language', this.state.selectedLanguage);

        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/demo/transcribe`;
        const res = await axios.post(backendAPI, formData);
        const transcribeUrl = res.data.transcribeUrl;

        //open up Websocket connection
        var websocket = new WebSocket(transcribeUrl);
        websocket.binaryType = 'arraybuffer';

        websocket.onopen = () => {
            this.setState({ socket: websocket, streaming: true });

            //Make the spinner disappear
            micStream.on('data', rawAudioChunk => {
                // the audio stream is raw audio bytes. Transcribe expects PCM with additional metadata, encoded as binary
               let binary = convertAudioToBinaryMessage(rawAudioChunk);
        
                if (websocket.readyState === websocket.OPEN)
                    websocket.send(binary);
                }
            )};

        // handle messages, errors, and close events
        websocket.onmessage = async message => {

            //convert the binary event stream message to JSON
            var messageWrapper = eventStreamMarshaller.unmarshall(Buffer(message.data));

            var messageBody = JSON.parse(String.fromCharCode.apply(String, messageWrapper.body)); 

            //THIS IS WHERE YOU DO SOMETHING WITH WHAT YOU GET FROM TRANSCRIBE
            //console.log("Got something from Transcribe!:");

            const results = messageBody.Transcript.Results;
            if (results.length > 0) {
                if (results[0].Alternatives.length > 0) {
                    var transcript = results[0].Alternatives[0].Transcript;
                    transcript = decodeURIComponent(escape(transcript));

                    this.setState({ text: this.state.text + transcript + '\n' });

                    if (!results[0].IsPartial) {
                        transcription += transcript + '\n';
                    }
                    else {
                        console.log("isPartial is false. " + transcription);
                    }
                }
            }
        }

        websocket.onerror = () => {
            toast.error("Websocket connection error. Try again.");
            // toggle button
        }

        websocket.onclose = () => {
            micStream.stop();
            this.setState({ streaming: false, socket: null})
            // toggle button
        }

        function convertAudioToBinaryMessage(audioChunk) {
            let raw = mic.toRaw(audioChunk);
        
            if (raw == null)
                return;
        
            // downsample and convert the raw audio bytes to PCM
            let downsampledBuffer = downsampleBuffer(raw, inputSampleRate, transcribeSampleRate);
            let pcmEncodedBuffer = pcmEncode(downsampledBuffer);
        
            // add the right JSON headers and structure to the message
            let audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer));
        
            //convert the JSON object + headers into a binary event stream message
            let binary = eventStreamMarshaller.marshall(audioEventMessage);
        
            return binary;
        }

        function getAudioEventMessage(buffer) {
            // wrap the audio data in a JSON envelope
            return {
                headers: {
                    ':message-type': {
                        type: 'string',
                        value: 'event'
                    },
                    ':event-type': {
                        type: 'string',
                        value: 'AudioEvent'
                    }
                },
                body: buffer
            };
        }
    }  

    render() {
        return (
            <div>
                <br></br>
                <h1 className="text-secondary text-center">Speech Recognition with AWS Transcribe</h1>
                <br></br>
                <ToastContainer position="bottom-right" autoClose="3000" />

                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="text-center">
                                <div className="input-group">
                                    <div className="input-group-prepend tts-text">
                                    <span className="input-group-text">Text</span>
                                    </div>
                                    <textarea id="transcription" className="form-control" aria-label="With textarea" value={this.state.text} />
                                </div>
                                
                                <br/><br/>

                                <button onClick={this.transcribe.bind(this)}>{!this.state.streaming ? 'Start streaming' : 'Stop streaming'}</button>
                                streaming: {this.state.streaming ? "true": "false"} socket: {this.state.socket ? "opened": "closed"} 
                                <br/>
                                
                            </div>
                        </div>
                        <div className="col-4">
                            {this.state.languages && <div>
                            <label>Language</label>
                            <br />
                            <select id="selectLanguages" value={this.state.selectedLanguage} onChange={this.languageChanged}>
                                {this.loading && <option value="0">Loading...</option>}
                                {this.state.languages.map(({ language, languageCode }, index) =>
                                    <option value={languageCode} key={languageCode}>{language+' ('+languageCode+')'}</option>
                                )}
                            </select>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TranscribeDemo;