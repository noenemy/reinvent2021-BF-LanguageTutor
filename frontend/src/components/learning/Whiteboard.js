import React, { Component } from 'react';
import Rekognition from './Rekognition';
import Textract from './Textract';
import Vocabulary from './Vocabulary';
import Transcribe from './Transcribe';
import Textbook from './Textbook';

class Whiteboard extends Component {

    render() {
        const content = this.props.content;

        let component;
        if (content) {
            if (content.type === "textbook") {
                component = <Textbook content={content} />;
            } else if (content.type === "vocabulary") {
                component = <Vocabulary content={content} />;
            } else if (content.type === "transcribe") {
                component = <Transcribe content={content} language={this.props.language} onCorrect={this.props.onCorrect} onWrong={this.props.onWrong} />;
            } else if (content.type === "rekognition") {
                component = <Rekognition content={content} onCorrect={this.props.onCorrect} onWrong={this.props.onWrong} />;
            } else if (content.type === "textract" ) {
                component = <Textract content={content} onCorrect={this.props.onCorrect} onWrong={this.props.onWrong} />;
            }
        }
        return (
            <div>
                { component }
            </div>
        );
    }
}

export default Whiteboard;
