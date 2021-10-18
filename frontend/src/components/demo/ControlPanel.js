import {useState} from "react";

const ControlPannel = () => {
  const [leftTextBoxContent, setLeftTextBoxContent] = useState();
  const [rightTextBoxContent, setRightTextBoxContent] = useState();

  function toggleHost (event) {
    console.log(event)
  }

  const renderFn = [];
  const speakers = new Map([
    ['Luke', undefined],
    ['Alien', undefined],
  ]);

  useState(() => {
    const leftText = `
        <speak>
          <amazon:domain name="conversational">
            Hello, my name is Luke. I used to only be a host inside Amazon Sumerian, but
            now you can use me in other Javascript runtime environments like three js
            and Babylon js. Right now,
            <mark name='{"feature":"PointOfInterestFeature","method":"setTargetByName","args":["chargaze"]}'/>
            my friend and I here are in three js.
          </amazon:domain>
        </speak>
    `
    setLeftTextBoxContent(leftText);
  }, [])

  useState(() => {
    const rightText = `
      <speak>
        Hi there! As you can see I'm set up to be a host too, although I don't use
        the same type of skeleton as any of the original Amazon Sumerian hosts. With
        open source hosts, you can apply host functionality to any custom animated
        character you'd like. I'm excited to see what kinds of interesting host
        characters you'll bring to life!
      </speak>
    `
    setRightTextBoxContent(rightText);
  }, [])

  return (
    <div id="textToSpeech">
      <button className="tab current" onClick={toggleHost}>Luke</button>
      <button className="tab" onClick={toggleHost}>Alien</button>
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