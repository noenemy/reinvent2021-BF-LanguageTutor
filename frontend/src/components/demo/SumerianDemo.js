import React, { Component } from 'react';

class SumerianDemo extends Component {
    render() {
        return (
            <div>
                <br></br>
                <h1 class="text-secondary text-center">AR/VR with AWS Sumerian</h1>
                <br></br>
                <embed src="https://b1c488ba24314be6853fb8448119ee65.us-west-2.sumerian.aws/?" 
                    width="600" height="400">
                </embed> 
            </div>
        );
    }
}

export default SumerianDemo;