import {useEffect, useState,} from "react";

const ControlPannel = () => {
  const [host, setHost] = useState('Luke');
  const [sumerian, setSumerian] = useState(null);
  const [leftTextBoxContent, setLeftTextBoxContent] = useState(`
        <speak>
          <amazon:domain name="conversational">
            Hello, my name is Luke. I used to only be a host inside Amazon Sumerian, but
            now you can use me in other Javascript runtime environments like three js
            and Babylon js. Right now,
            <mark name='{"feature":"PointOfInterestFeature","method":"setTargetByName","args":["chargaze"]}'/>
            my friend and I here are in three js.
          </amazon:domain>
        </speak>
    `);
  const [rightTextBoxContent, setRightTextBoxContent] = useState(`
      <speak>
        Hi there! As you can see I'm set up to be a host too, although I don't use
        the same type of skeleton as any of the original Amazon Sumerian hosts. With
        open source hosts, you can apply host functionality to any custom animated
        character you'd like. I'm excited to see what kinds of interesting host
        characters you'll bring to life!
      </speak>
    `);

  // send data to iframe
  function sendToIframe(iframe, msg) {
    if (iframe === null) return;
    iframe.contentWindow.postMessage(msg, '*');
  }

  function togglePlay () {
    // set data
    sendToIframe(sumerian, {
      'type': 'play',
      'host': host,
      'dialog': host === 'Luke' ? leftTextBoxContent : rightTextBoxContent
    })
  }

  function togglePause() {
    sendToIframe(sumerian, {type: 'pause'})
  }

  function toggleResume() {
    sendToIframe(sumerian, {type: 'resume'})
  }

  function toggleStop() {
    sendToIframe(sumerian, {type: 'stop'})
  }

  // load iframe element
  useEffect(() => {
    setSumerian(document.getElementById('sumerianHost'));
    console.log('ready to start')
  }, [])

  // fetch data from iframe
  useEffect(() => {
    const id = window.addEventListener('message', function (e) {
      console.log(e.data);
    })

    return (
      window.removeEventListener('click', id)
    )
  }, [])

  return (

    <div id="textToSpeech">
      <button className={ host === 'Luke' ? 'tab current' : 'tab'} onClick={() => setHost('Luke')}>Luke</button>
      <button className={ host === 'Alien' ? 'tab current' : 'tab'} onClick={() => setHost('Alien')}>Alien</button>
      <div>
        <textarea autoFocus style={{display:  host === 'Luke' ? 'block' : 'none'}} size="23" type="text" className="textEntry Luke" value={leftTextBoxContent} onChange={() => {}}></textarea>
        <textarea autoFocus style={{display: host === 'Alien' ? 'block' : 'none'}} size="23" type="text" className="textEntry Alien" value={rightTextBoxContent} onChange={() => {}}></textarea>
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