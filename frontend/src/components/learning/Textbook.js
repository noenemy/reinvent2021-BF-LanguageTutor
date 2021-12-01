import React, { Component } from 'react';

class Textbook extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var pictureHTML = "";
        if (this.props.content.picture != null) {
            pictureHTML = "<img class='center' src=/assets/images/" + this.props.content.picture + " alt='' height='230px' />";
        }

        const RAWHTML = pictureHTML + this.props.content.body;

        return(
            <div>
                <div dangerouslySetInnerHTML={{ __html: RAWHTML.replace(/\n/g, '<br />')}} />
            </div>
        )
    }
}

export default Textbook;