import React, { Component } from 'react';
import Rekognition from './Rekognition';
import Textract from './Textract';
import Vocabulary from './Vocabulary';
import Transcribe from './Transcribe';

class Whiteboard extends Component {

    render() {
        const content = this.props.content;

        let component;
        if (content) {
            if (content.type === "textbook") {
                component = <Textbook content={content.body} />;
            } else if (content.type === "vocabulary") {
                component = <Vocabulary content={content} />;
            } else if (content.type === "transcribe") {
                component = <Transcribe content={content.body} onCorrect={this.props.onCorrect} onWrong={this.props.onWrong} />;
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

function Textbook(props){
    const RAWHTML = props.content;
    return(
        <div>
            <div dangerouslySetInnerHTML={{ __html: RAWHTML.replace(/\n/g, '<br />')}} />
        </div>
    )
}

export default Whiteboard;
