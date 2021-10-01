import React, { Component, Fragment} from 'react';
import PollyDemo from './PollyDemo';
import RekognitionDemo from './RekognitionDemo';
import TextractDemo from './TextractDemo';
import TranscribeDemo from './TranscribeDemo';
import SumerianDemo from './SumerianDemo';

class DemoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 }
  }

  render() {
    const tabContArr=[
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===0 ? "active" : ""}' onClick={()=>tabClickHandler(0)} href="#"> Rekognition Demo </li>
          ),
          tabCont:(
              <RekognitionDemo></RekognitionDemo>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===1 ? "active" : ""}' onClick={()=>tabClickHandler(1)}> Textract Demo </li>
          ),
          tabCont:(
              <TextractDemo></TextractDemo>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===2 ? "active" : ""}' onClick={()=>tabClickHandler(2)}> Polly Demo </li>
          ),
          tabCont:(
              <PollyDemo></PollyDemo>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===3 ? "active" : ""}' onClick={()=>tabClickHandler(3)}> Transcribe Demo </li>
          ),
          tabCont:(
              <TranscribeDemo></TranscribeDemo>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===4 ? "active" : ""}' onClick={()=>tabClickHandler(4)}> Sumerian Demo </li>
          ),
          tabCont:(
              <SumerianDemo></SumerianDemo>
          )
      }
    ];

    const tabClickHandler=(index)=>{
      this.setState({activeIndex: index});
    }

    return (
      <Fragment>
        <div class="container">
          <ul className="nav nav-pills nav-fill">
            {tabContArr.map((section, index)=>{
              return section.tabTitle
            })}
          </ul>

          <div>
            { tabContArr[this.state.activeIndex].tabCont }
          </div>
        </div>
      </Fragment>
    );
  }
};

export default DemoComponent;
