import React, { Component } from 'react';

class Vocabulary extends Component {
    render() {
        const picture_url = "/assets/images/"+this.props.content.image;

        return (
            <div>
               <div className="row align-items-center" >
                    <div className="col-2"></div>
                    <div className="col-6 text-center">
                        <br />
                        <img src={picture_url} alt="apple" />
                    </div>
                    <div className="col-4">
                        <h1 className="text-primary">{this.props.content.word}</h1>
                        <h4 className="text-muted">[{this.props.content.pronunciation}]</h4>
                        <h4 className="text-muted">{this.props.content.help}</h4>
                    </div>
                </div>

                <br /><br />
            </div>
        );
    }
}

export default Vocabulary;