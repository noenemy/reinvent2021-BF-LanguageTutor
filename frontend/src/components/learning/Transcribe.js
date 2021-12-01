import React, { Component } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mic from 'microphone-stream';
import { pcmEncode, downsampleBuffer } from '../../util/audioUtils.js';
import { EventStreamMarshaller } from '@aws-sdk/eventstream-marshaller';
import { toUtf8, fromUtf8 } from '@aws-sdk/util-utf8-node';
import { ReactMic } from 'react-mic';

class Transcribe extends Component {
    constructor(props) {
        super(props);
        this.eventStreamMarshaller = null;
        this.websocket = null;
        this.state = {
            language: 'ko-KR',
            expectedText: '',       
            transcribedText: '',
            record: false
        };
    }

    componentDidMount() {
        //this.getTranscribeLanguages();
        this.setState({ expectedText: this.props.content.answer });
    }

    startRecording = () => {
        this.setState({ transcribedText: '', record: true }, () => {
            this.transcribe();
        });
    }

    stopRecording = () => {
        this.setState({ record: false }, () => {
            if (this.websocket != null)
                this.websocket.close();    
        });
    }

    getStringSimilarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
          longer = s2;
          shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
          return 1.0;
        }
        return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        
        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                var newValue = costs[j - 1];
                if (s1.charAt(i - 1) != s2.charAt(j - 1))
                    newValue = Math.min(Math.min(newValue, lastValue),
                    costs[j]) + 1;
                costs[j - 1] = lastValue;
                lastValue = newValue;
                }
            }
            }
            if (i > 0)
            costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }
    
    async transcribe() {

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
        formData.append('language', this.state.language);

        const backendAPI = `${process.env.REACT_APP_BACKEND_SERVER}/demo/transcribe`;
        const res = await axios.post(backendAPI, formData);
        const transcribeUrl = res.data.transcribeUrl;

        //open up Websocket connection
        this.websocket = new WebSocket(transcribeUrl);
        this.websocket.binaryType = 'arraybuffer';

        this.websocket.onopen = () => {

            //Make the spinner disappear
            micStream.on('data', rawAudioChunk => {
                // the audio stream is raw audio bytes. Transcribe expects PCM with additional metadata, encoded as binary
               let binary = convertAudioToBinaryMessage(rawAudioChunk);
        
                if (this.websocket.readyState === this.websocket.OPEN)
                    this.websocket.send(binary);
                }
            )};

        // handle messages, errors, and close events
        this.websocket.onmessage = async message => {

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
                    this.setState({ transcribedText: transcript });
                    //this.setState({ text: this.state.text + transcript + '\n' });

                    if (!results[0].IsPartial) {
                        //    this.setState({ text: transcript });
                        //    transcription += transcript + '\n';
                        var similarity = this.getStringSimilarity(this.state.expectedText, this.state.transcribedText);
                        if (similarity >= 0.8) {
                            this.props.onCorrect();
                        } else {
                            this.props.onWrong();
                        }
                    }
                    else {
                        console.log("isPartial is false. " + transcription);
                    }
                }
            }
        }

        this.websocket.onerror = () => {
            toast.error("Websocket connection error. Try again.");
        }

        this.websocket.onclose = () => {
            micStream.stop();
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

        const RAWHTML = this.props.content.body;
        return(
            <div>
                <br />
                <h6><i className="fas fa-question-circle"></i> &nbsp; Listen and repeat</h6>
                
                <div dangerouslySetInnerHTML={{ __html: RAWHTML.replace(/\n/g, '<br />')}} />
            
                <div>
                    <ReactMic
                        record={this.state.record}
                        className="sound-wave"
                        onStop={this.onStop}
                        onData={this.onData}
                        strokeColor="#000000"
                        backgroundColor="#FF4081" />
                    <button onClick={this.startRecording} type="button">Start</button>
                    <button onClick={this.stopRecording} type="button">Stop</button>
                    <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="">
                        <h1><i className="fas fa-microphone"></i></h1>
                    </button>
                    <div>{this.state.transcribedText}</div>
                </div>
            </div>
        )
    }
}

export default Transcribe;