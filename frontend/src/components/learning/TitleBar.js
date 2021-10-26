import React, { Component } from 'react';

class TitleBar extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <i className="fas fa-book" />
                    <a href="/learning" onClick={this.goLearningHome}>My Learning</a>
                    /&nbsp;&nbsp;{this.props.className}
                </div>
                <div className="col-9">
                    <h3>{this.props.lectureTitle}</h3>
                </div>
            </div>
        );
    }
}

export default TitleBar;