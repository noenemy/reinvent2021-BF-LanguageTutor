import React, { Component } from 'react';
import Rekognition from './Rekognition';

class Whiteboard extends Component {

    render() {
        const content = this.props.content;

        let component;
        if (content) {
            if (content.type === "textbook") {
                component = <Textbook content={content.body} />;
            } else if (content.type === "vocabulary") {
                component = <Vocabulary content={content.body} />;
            } else if (content.type === "transcribe") {
                component = <Transcribe content={content.body} onCorrect={this.props.onCorrect} onWrong={this.props.onWrong} />;
            } else if (content.type === "rekognition") {
                component = <Rekognition content={content}  onCorrect={this.props.onCorrect} onWrong={this.props.onWrong} />;
            } else if (content.type === "textract" ) {
                component = <Textract content={content.body}  onCorrect={this.props.onCorrect} onWrong={this.props.onWrong} />;
            }
        }
        return (
            <div>
                { component }
            </div>
        );
    }
}

function Textbook(props){
    return(
        <div>
            {props.content}
        </div>
    )
}

function Vocabulary(){
    return(
        <div>

            <div className="row align-items-center" >
                <div className="col-6">
                    <img src="/assets/images/apple.png" alt="apple" />
                </div>
                <div className="col-6">
                    <h2 className="text-primary">사과</h2>
                    <h4 className="text-muted">apple</h4>
                </div>
            </div>


            <br /><br />


        </div>
    )
}

function Transcribe(){
    return(
        <div>
            <h1>Transcribe</h1>
        </div>
    )
}

function Textract(){
    return(
        <div>
            <h1>Textract</h1>
        </div>
    )
}

export default Whiteboard;