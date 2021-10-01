import React, { Component, Fragment} from 'react';

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
              <div> Rekognition </div>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===1 ? "active" : ""}' onClick={()=>tabClickHandler(1)}> Textract Test </li>
          ),
          tabCont:(
              <div> Textract </div>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===2 ? "active" : ""}' onClick={()=>tabClickHandler(2)}> Polly Test </li>
          ),
          tabCont:(
              <div> Polly </div>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===3 ? "active" : ""}' onClick={()=>tabClickHandler(3)}> Transcribe Test </li>
          ),
          tabCont:(
              <div> Transcribe </div>
          )
      },
      {
          tabTitle:(
            <li className='nav-link {this.state.activeIndex===4 ? "active" : ""}' onClick={()=>tabClickHandler(4)}> Sumerian Test </li>
          ),
          tabCont:(
              <div> Sumerian </div>
          )
      }
    ];

    const tabClickHandler=(index)=>{
      this.setState({activeIndex: index});
    }

    return (
      <Fragment>
        <h1>Test</h1>
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
