import {useEffect, useState,} from "react";

const ControlPannel = () => {
  const [host, setHost] = useState('Luke');
  const [sumerian, setSumerian] = useState(null);
  const [leftTextBoxContent, setLeftTextBoxContent] = useState();
  const [rightTextBoxContent, setRightTextBoxContent] = useState();

  function sendToIframe(iframe, msg) {
    if (iframe === null) return;
    iframe.contentWindow.postMessage(msg, '*');
  }

  function togglePlay () {
    sendToIframe(sumerian, 'play')
  }

  function togglePause() {
    sendToIframe(sumerian, 'pause')
  }

  function toggleResume() {
    sendToIframe(sumerian, 'resume')
  }

  function toggleStop() {
    sendToIframe(sumerian, 'stop')
  }

  useEffect(() => {
    setSumerian(document.getElementById('sumerianHost'));
    console.log('ready to start')
  }, [])

  return (

    <div id="textToSpeech">
      <button className={ host === 'Luke' ? 'tab current' : 'tab'} onClick={() => setHost('Luke')}>Luke</button>
      <button className={ host === 'Alien' ? 'tab current' : 'tab'} onClick={() => setHost('Alien')}>Alien</button>
      <div>
        <textarea autoFocus size="23" type="text" className="textEntry Luke" value={leftTextBoxContent} onChange={() => {}}></textarea>
        <textarea autoFocus size="23" type="text" className="textEntry Alien" value={rightTextBoxContent} onChange={() => {}}></textarea>
      </div>
      <div>
        <button id="play" className="speechButton" onClick={togglePlay}>Play</button>
        <button id="pause" className="speechButton" onClick={togglePause}>Pause</button>
        <button id="resume" className="speechButton" onClick={toggleResume}>Resume</button>
        <button id="stop" className="speechButton" onClick={toggleStop}>Stop</button>
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