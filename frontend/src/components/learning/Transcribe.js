import React, { Component } from 'react';

class Transcribe extends Component {
    // TODO : implement this feature

    render() {
        return (
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
        );
    }
}

export default Transcribe;