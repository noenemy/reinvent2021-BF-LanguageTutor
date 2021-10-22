import React, { Component } from 'react';

class TitleBar extends Component {
    render() {
        return (
            <div>
                <div className="col-3">
                    <a href="#" onClick={this.goLearningHome}>Home</a> - 
                    Class: {this.props.language} {this.props.class}
                </div>
                <div className="col-9">
                    <h3>Unit {this.props.unit} 1. Title here</h3>
                </div>
            </div>
        );
    }
}

export default TitleBar;