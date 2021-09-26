import React from 'react';

const TestComponent = () => {

  const selectedItem = 'rekognitioon';

  return(
      <div>
        <h1>Test</h1>
        <div class="container">
          <nav>
            <div class="nav nav-pills nav-justified" id="nav-tab" role="tablist">
              <a class="nav-item nav-link" id="nav-rekognition-tab" data-toggle="tab" role="tab" aria-controls="nav-rekognition" aria-selected="true">Rekognition Test</a>
              <a class="nav-item nav-link" id="nav-textract-tab" data-toggle="tab" role="tab" aria-controls="nav-textract" aria-selected="false">Textract Test</a>
              <a class="nav-item nav-link" id="nav-polly-tab" data-toggle="tab" role="tab" aria-controls="nav-polly" aria-selected="false">Polly Test</a>
              <a class="nav-item nav-link" id="nav-transcribe-tab" data-toggle="tab" role="tab" aria-controls="nav-transcribe" aria-selected="false">Transcribe Test</a>
              <a class="nav-item nav-link" id="nav-sumerian-tab" data-toggle="tab" role="tab" aria-controls="nav-sumerian" aria-selected="false">Sumerian Test</a>
            </div>
          </nav>
        </div>
        {
          /*renderTestComponent('textract')*/
        }
      </div>
    );

  /*
  renderTestComponent(param) ({
    switch (param) {
      case 'rekognition':
        return 'rekognition';
      case 'textract':
        return 'textract';
      default:
        return 'unknown';
    }
  }
  */
};

export default TestComponent;
