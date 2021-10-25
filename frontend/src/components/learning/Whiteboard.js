import React, { Component } from 'react';

class Whiteboard extends Component {

    render() {
        return (
            <div>
                <Vocabulary />

            </div>
        );
    }
}

function Textbook(){
    return(
        <div>
            <h1>Introduction</h1>
            <hr />

            <h2 className="text-primary">안녕하세요.</h2>
            <h4 className="text-muted">Hello. How are you?</h4>

            <br /><br />

            <h2 className="text-primary">안녕.</h2>
            <h4 className="text-muted">Hi?</h4>
        </div>
    )
}

function Vocabulary(){
    return(
        <div>
            <h1>Vocabulary</h1>
            <hr />

            <div className="row align-items-center" >
                <div className="col-6">
                    <img src="/assets/images/apple.png" />
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

export default Whiteboard;