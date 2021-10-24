import { useState, useEffect } from "react";

const ControlPannel = () => {
  const [host, setHost] = useState();
  const [leftTextBoxContent, setLeftTextBoxContent] = useState();
  const [rightTextBoxContent, setRightTextBoxContent] = useState();

  return (

    <div id="textToSpeech">
      <button className="tab current" onClick={() => setHost('Luke')}>Luke</button>
      <button className="tab" onClick={() => setHost('Alien')}>Alien</button>
      <div>
        <textarea autoFocus size="23" type="text" className="textEntry Luke" value={leftTextBoxContent} onChange={() => {}}></textarea>
        <textarea autoFocus size="23" type="text" className="textEntry Alien" value={rightTextBoxContent} onChange={() => {}}></textarea>
      </div>
      <div>
        <button id="play" className="speechButton">Play</button>
        <button id="pause" className="speechButton">Pause</button>
        <button id="resume" className="speechButton">Resume</button>
        <button id="stop" className="speechButton">Stop</button>
      </div>
      <div>
        <button id="gestures" className="gestureButton">Generate Gestures</button>
      </div>
      <div>
        <select id="emotes" className="gestureButton"></select>
      </div>
      <div>
        <button id="playEmote" className="gestureButton">Play Emote</button>
      </div>
    </div>
  )
}

export default ControlPannel;