import React, { Component, Fragment } from 'react';

class TestComponent extends Component {

  render() {
    const selectedItem = 'rekognition';

    const renderTestComponent = (param) => {
      switch (param) {
        case 'rekognition':
          return 'rekognition';
        case 'textract':
          return 'textract';
        default:
          return 'unknown';
      }
    };

    return (
      <Fragment>
        <h1>Test</h1>
        <div class="container">
          <nav>
            <div className="nav nav-pills nav-justified" id="nav-tab" role="tablist">
              <a className="nav-item nav-link" id="nav-rekognition-tab" data-toggle="tab" role="tab" aria-controls="nav-rekognition" aria-selected="true" href="/">Rekognition Test</a>
              <a className="nav-item nav-link" id="nav-textract-tab" data-toggle="tab" role="tab" aria-controls="nav-textract" aria-selected="false" href="/">Textract Test</a>
              <a className="nav-item nav-link" id="nav-polly-tab" data-toggle="tab" role="tab" aria-controls="nav-polly" aria-selected="false" href="/">Polly Test</a>
              <a className="nav-item nav-link" id="nav-transcribe-tab" data-toggle="tab" role="tab" aria-controls="nav-transcribe" aria-selected="false" href="/">Transcribe Test</a>
              <a className="nav-item nav-link" id="nav-sumerian-tab" data-toggle="tab" role="tab" aria-controls="nav-sumerian" aria-selected="false" href="/">Sumerian Test</a>
            </div>
          </nav>
        </div>
        <div>{selectedItem ? renderTestComponent(selectedItem) : null}</div>
      </Fragment>
    );
  }
};

export default TestComponent;
