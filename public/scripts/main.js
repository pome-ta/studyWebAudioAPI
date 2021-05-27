'use strict';


const AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();


const keyboardWidth = document.querySelector('.synth').clientWidth;

const settings = {
  id: 'keyboard',
  width: `${keyboardWidth}`,
  height: 128,
  startNote: 'A2',
  margin: 'auto',
  whiteNotesColour: '#fff',
  blackNotesColour: '#000',
  borderColour: '#000',
  activeColour: 'maroon',
  octaves: 2,
  musicalTyping: false
}

let keyboard = new window.QwertyHancock(settings);
const analyzeNode = context.createAnalyser();
const masterGain = context.createGain();
let nodes = [];

masterGain.gain.value = 0.3;

masterGain.connect(analyzeNode);
analyzeNode.connect(context.destination);

//analyzeNode.connect(masterGain);
//masterGain.connect(context.destination);

keyboard.keyDown = (_, frequency) => {
  const oscillator = context.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  
  //oscillator.connect(analyzeNode);
  oscillator.connect(masterGain);
  oscillator.start(0);
  
  nodes.push(oscillator);
};



keyboard.keyUp = (_, frequency) => {
  const newNodes = [];

  for (const nd of nodes) {
    if (Math.round(nd.frequency.value) === Math.round(frequency)) {
      nd.stop(0);
      nd.disconnect();
    } else {
      newNodes.push(nd);
    }
  }

  nodes = newNodes;
};

// xxx: 🤔
//keyboard = new window.QwertyHancock(settings);

 
 
 
 /* visualizar */
 
function visualize() {
  const WIDTH = viCanvas.width;
  const HEIGHT = viCanvas.height;

  analyzeNode.fftSize = 2048;
  const bufferLength = analyzeNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  vcctx.clearRect(0, 0, WIDTH, HEIGHT);

  const draw = () => {
    requestAnimationFrame(draw);
    analyzeNode.getByteTimeDomainData(dataArray);
    
    

    vcctx.fillStyle = 'rgb(233, 233, 233)';
    vcctx.fillRect(0, 0, WIDTH, HEIGHT);
    vcctx.lineWidth = 1;
    vcctx.strokeStyle = 'rgb(35, 35, 35)';
    vcctx.beginPath();
    const sliceWidth = WIDTH * 1.0 / bufferLength;

    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * HEIGHT / 2;
      // todo: ショートハンドすぎる？
      i === 0 ? vcctx.moveTo(x, y) : vcctx.lineTo(x, y);
      x += sliceWidth;
    }
    vcctx.lineTo(viCanvas.width, viCanvas.height / 2);
    vcctx.stroke();
    
  };
  draw();
}

const viCanvas = document.querySelector('.visualizer');
const vcctx = viCanvas.getContext("2d");
const intendedWidth = document.querySelector('.wrapper').clientWidth;
viCanvas.setAttribute('width', intendedWidth);
viCanvas.setAttribute('height', intendedWidth / 4);
visualize()
