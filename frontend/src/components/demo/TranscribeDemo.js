import React, { Component } from 'react';
import axios from "axios";
import mic from 'microphone-stream';
import { pcmEncode, downsampleBuffer } from '../../util/audioUtils.js';
import { EventStreamMarshaller, Message } from '@aws-sdk/eventstream-marshaller';
import { toUtf8, fromUtf8 } from '@aws-sdk/util-utf8-node';

class TranscribeDemo extends Component {
    constructor(props) {
        super(props);
        this.eventStreamMarshaller = null;
        this.state = {
            selectedLanguage: 'en-US',
            languages: null,            
            text: '',
        };
    }

    componentDidMount() {
        this.getTranscribeLanguages();
    }

    async getTranscribeLanguages() {
        this.setState({ loading: true });
        const backendAPI = process.env.REACT_APP_BACKEND_SERVER + '/demo/transcribe/languages';
        const res = await axios.get(backendAPI);        
        this.setState({ loading: false });

        if (res !== null) {
            this.setState({ languages: res.data });
        }
        else {
            console.log("something wrong! try again.");
        }
    }

    languageChanged = (event) => {
        this.setState({ selectedLanguage: event.target.value});
    }
    
    async transcribe() {

        var micStream = null;
        var mediaStream = null;
        var inputSampleRate = 0;
        const transcribeSampleRate = 16000;
        const transcribeLanguageCode = 'en-US';
        const sampleRate = 44100;
        const eventStreamMarshaller = new EventStreamMarshaller(toUtf8, fromUtf8);


        try {
            mediaStream = await window.navigator.mediaDevices.getUserMedia({
                    video: false,
                    audio: true
                })
        }
        catch (error) {
            console.log(error);
            alert("Error. Please make sure you allow this website to access your microphone");
            return;
        }

        //this.eventStreamMarshaller = new marshaller.EventStreamMarshaller(util_utf8_node.toUtf8, util_utf8_node.fromUtf8);
        //let's get the mic input from the browser, via the microphone-stream module
        micStream = new mic();

        micStream.on("format", data => {
            inputSampleRate = data.sampleRate;
        });

        micStream.setStream(mediaStream);        

        const backendAPI = process.env.REACT_APP_BACKEND_SERVER + '/demo/transcribe';
        console.log(backendAPI);
        const res = await axios.get(backendAPI);
        const transcribeUrl = res.data.transcribeUrl;
        console.log(transcribeUrl);

        //open up Websocket connection
        var websocket = new WebSocket(transcribeUrl);
        websocket.binaryType = 'arraybuffer';

        websocket.onopen = () => {
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
            console.log("Got something from Transcribe!:");
            console.log(messageBody);
        }

        // FUNCTIONS
        function convertAudioToBinaryMessage(audioChunk) {
            var raw = mic.toRaw(audioChunk);
            if (raw == null) return; // downsample and convert the raw audio bytes to PCM
            var downsampledBuffer = downsampleBuffer(raw, inputSampleRate, transcribeSampleRate);
            var pcmEncodedBuffer = pcmEncode(downsampledBuffer); // add the right JSON headers and structure to the message
        
            var audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer)); //convert the JSON object + headers into a binary event stream message
        
            var binary = eventStreamMarshaller.marshall(audioEventMessage);
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

                                <button onClick={this.transcribe}>Transcribe</button>
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