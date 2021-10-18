import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadScreen from "./LoadScreen";
import ControlPanel from "./ControlPanel";

const SumerianDemo = () => {

  console.log('SumerianDemoFC')

  return (
    <div>
      <br></br>
      <h1 className="text-secondary text-center">AR/VR with AWS Sumerian</h1>
      <br></br>
      <ToastContainer position="bottom-right" autoClose="3000" />

        <div className="container">
            <div className="row">
                <div className="col-8">

                  <div className="text-center">
                    <LoadScreen></LoadScreen>
                    
                  </div>
                </div>

                <div className="col-4">
                    <div>
                      <ControlPanel></ControlPanel>
                    </div>
                </div> 
            </div>
        </div>

    </div>
    );
  }

export default SumerianDemo;