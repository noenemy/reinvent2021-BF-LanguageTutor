import React, { Component, Fragment} from 'react';
import PollyTest from './PollyTest';
import RekognitionTest from './RekognitionTest';
import TextractTest from './TextractTest';
import TranscribeTest from './TranscribeTest';
import SumerianTest from './SumerianTest';

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 }
  }

  render() {
    const tabContArr=[
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===0 ? "active" : ""}' onClick={()=>tabClickHandler(0)} href="#"> Rekognition Test </li>
          ),
          tabCont:(
              <RekognitionTest></RekognitionTest>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===1 ? "active" : ""}' onClick={()=>tabClickHandler(1)}> Textract Test </li>
          ),
          tabCont:(
              <TextractTest></TextractTest>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===2 ? "active" : ""}' onClick={()=>tabClickHandler(2)}> Polly Test </li>
          ),
          tabCont:(
              <PollyTest></PollyTest>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===3 ? "active" : ""}' onClick={()=>tabClickHandler(3)}> Transcribe Test </li>
          ),
          tabCont:(
              <TranscribeTest></TranscribeTest>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===4 ? "active" : ""}' onClick={()=>tabClickHandler(4)}> Sumerian Test </li>
          ),
          tabCont:(
              <SumerianTest></SumerianTest>
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

export default TestComponent;
