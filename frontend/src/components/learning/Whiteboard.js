import React, { Component } from 'react';
import Rekognition from './Rekognition';
import Textract from './Textract';
import Vocabulary from './Vocabulary';

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

function Transcribe(){
    return(
        <div>
            <div>
                <br />
                <h6><i className="fas fa-question-circle"></i> &nbsp; 
                Listen and repeat</h6>
            </div>
                <div className="text-center">
                <br />
                <div className='row text-center'>
                    <h1 className='text-primary'>안녕하세요.</h1>
                    <h4 className='text-muted'>[annyeonghaseyo]</h4>
                    <h4 className='text-muted'>Hello</h4>
                </div>
                <br /><br />
                <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="">
                    <h1><i className="fas fa-microphone"></i></h1>
                </button>
            </div>
        </div>
    )
}

export default Whiteboard;
