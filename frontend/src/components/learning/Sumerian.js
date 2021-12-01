import React, { Component } from 'react';

class TutorViewer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var sumerian_host_page = "/three-" + this.props.language + ".html";

        return (
            <div>
                <iframe id="sumerianHost" title="sumerianHost" src={sumerian_host_page} width="640" height="400" />
            </div>
        );
    }
}

export default TutorViewer;