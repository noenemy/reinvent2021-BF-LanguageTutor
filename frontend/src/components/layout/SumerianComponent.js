import React, { Component } from 'react';
import ReactDOM from "react-dom";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class SumerianComponent extends Component {

  componentDidMount() {
    const renderer = new THREE.WebGLRenderer({antialias: true});
    const {scene, camera, clock} = createScene();

    const renderFn = [];
    main();

    async function main() {
      // TODO: 
      // Initialize AWS and create Polly service objects

      const characterFile1 = '/assets/glTF/characters/adult_female/grace/grace.gltf';
      const animationPath1 = '/assets/glTF/animations/adult_female';
      const animationFiles = [
        'stand_idle.glb',
        'lipsync.glb',
        'gesture.glb',
        'emote.glb',
        'face_idle.glb',
        'blink.glb',
        'poi.glb',
      ];

      const gestureConfigFile = 'gesture.json';
      const poiConfigFile = 'poi.json';
      const audioAttachJoint1 = 'chardef_c_neckB'; // Name of the joint to attach audio to
      const lookJoint1 = 'charjx_c_look'; // Name of the joint to use for point of interest target tracking
      const voice1 = 'Matthew'; // Polly voice. Full list of available voices at: https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
      const voiceEngine = 'neural'; // Neural engine is not available for all voices in all regions: https://docs.aws.amazon.com/polly/latest/dg/NTTS-main.html


      const {
        character: character1,
        clips: clips1,
        bindPoseOffset: bindPoseOffset1,
      } = await loadCharacter(
        scene,
        characterFile1,
        animationPath1,
        animationFiles
      );

      character1.position.set(0, 0, 3); // right, up, front
      character1.rotateY(-0.1);

      // Find the joints defined by name
      const audioAttach1 = character1.getObjectByName(audioAttachJoint1);
      const lookTracker1 = character1.getObjectByName(lookJoint1);

      // Read the gesture config file. This file contains options for splitting up
      // each animation in gestures.glb into 3 sub-animations and initializing them
      // as a QueueState animation.
      const gestureConfig1 = await fetch(
        `${animationPath1}/${gestureConfigFile}`
      ).then(response => response.json());

      // Read the point of interest config file. This file contains options for
      // creating Blend2dStates from look pose clips and initializing look layers
      // on the PointOfInterestFeature.
      const poiConfig1 = await fetch(
        `${animationPath1}/${poiConfigFile}`
      ).then(response => response.json());

      const [
        idleClips1,
        lipsyncClips1,
        gestureClips1,
        emoteClips1,
        faceClips1,
        blinkClips1,
        poiClips1,
      ] = clips1;

      // TODO : create HOst
    }

  // Set up base scene
  function createScene() {
    // === THREE.JS CODE START ===

    //var scene = new THREE.Scene();
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();
    scene.background = new THREE.Color(0x33334d);
    scene.fog = new THREE.Fog(0x33334d, 0, 10);

    // Renderer
    //var renderer = new THREE.WebGLRenderer();
    //const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x33334d);
    renderer.domElement.id = 'renderCanvas';
    document.getElementById('sumerianCanvas').appendChild(renderer.domElement);
    //document.body.appendChild( renderer.domElement );

    // Env map
    new THREE.TextureLoader()
      .setPath('assets/')
      .load('images/machine_shop.jpg', hdrEquirect => {
        const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(
          hdrEquirect
        );
        hdrEquirect.dispose();
        pmremGenerator.dispose();

        scene.environment = hdrCubeRenderTarget.texture;
    });

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // Camera
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    //var camera = new THREE.PerspectiveCamera(THREE.MathUtils.radToDeg(0.8),window.innerWidth / window.innerHeight,0.1,1000);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 1.4, 3.1);
    controls.target = new THREE.Vector3(0, 0.8, 0);
    controls.screenSpacePanning = true;
    controls.update();

    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);

    // Render loop
    function render() {
      requestAnimationFrame(render);
      controls.update();

      // TODO: Load rederFn here!!
      //renderFn.forEach(fn => {
      //  fn();
      //});

      renderer.render(scene, camera);
    }

    render();

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
    hemiLight.position.set(0, 1, 0);
    hemiLight.intensity = 0.6;
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 5, 5);

    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.top = 2.5;
    dirLight.shadow.camera.bottom = -2.5;
    dirLight.shadow.camera.left = -2.5;
    dirLight.shadow.camera.right = 2.5;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);

    const dirLightTarget = new THREE.Object3D();
    dirLight.add(dirLightTarget);
    dirLightTarget.position.set(0, -0.5, -1.0);
    dirLight.target = dirLightTarget;

    // Environment
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x808080,
      depthWrite: false,
    });
    groundMat.metalness = 0;
    groundMat.refractionRatio = 0;
    const ground = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(100, 100),
      groundMat
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    return {scene, camera, clock};
    }

  // Load character model and animations
  async function loadCharacter(
    scene,
    characterFile,
    animationPath,
    animationFiles
  ) {
    // Asset loader
    const fileLoader = new THREE.FileLoader();
    //const gltfLoader = new GLTFLoader();
    const gltfLoader = new GLTFLoader();


    function loadAsset(loader, assetPath, onLoad) {
      console.log (assetPath);

      return new Promise(resolve => {
        loader.load(assetPath, async asset => {
          if (onLoad[Symbol.toStringTag] === 'AsyncFunction') {
            const result = await onLoad(asset);
            resolve(result);
          } else {
            resolve(onLoad(asset));
          }
        });
      });
    }
    // Load character model
    const {character, bindPoseOffset} = await loadAsset(
      gltfLoader,
      characterFile,
      gltf => {
        // Transform the character
        const character = gltf.scene;
        scene.add(character);

        // Make the offset pose additive
        const [bindPoseOffset] = gltf.animations;
        if (bindPoseOffset) {
          THREE.AnimationUtils.makeClipAdditive(bindPoseOffset);
        }

        // Cast shadows
        character.traverse(object => {
          if (object.isMesh) {
            object.castShadow = true;
          }
        });

        return {character, bindPoseOffset};
      }
    );

    // Load animations
    const clips = await Promise.all(
      animationFiles.map((filename, index) => {
        const filePath = `${animationPath}/${filename}`;

        return loadAsset(gltfLoader, filePath, async gltf => {
          return gltf.animations;
        });
      })
    );

    return {character, clips, bindPoseOffset};
  }

   // Initialize the host
   function createHost(
    character,
    audioAttachJoint,
    voice,
    engine,
    idleClip,
    faceIdleClip,
    lipsyncClips,
    gestureClips,
    gestureConfig,
    emoteClips,
    blinkClips,
    poiClips,
    poiConfig,
    lookJoint,
    bindPoseOffset,
    clock,
    camera,
    scene
  ) {
    // TODO: 

  }

    // THREE.JS
    renderer.setSize( window.innerWidth /2, window.innerHeight /2);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  render() {
    function toggleHost (event) {
      console.log(event)
    }

    const leftTextBoxContent = "Left Text Box Content";
    const rightTextBoxContent = "Left Text Box Content";

    return (
      <div>
        <div id="loadScreen">
          <div id="loader"></div>
        </div>
        <div id="sumerianCanvas"></div>
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
      </div>
    );
  }
}

export default SumerianComponent;