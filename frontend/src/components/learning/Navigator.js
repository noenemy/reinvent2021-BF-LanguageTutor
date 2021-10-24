import React, { Component } from 'react';
import './Classroom.css';

class Navigator extends Component {
    render() {
        return (
            <div className="d-flex justify-content-end">
                <a href="#" className="previous" onClick={this.props.onClickPrevious}>&laquo; Previous</a>
                <a href="#" className="next" onClick={this.props.onClickNext}>Next &raquo;</a>
            </div>
        );
    }
}

export default Navigator;