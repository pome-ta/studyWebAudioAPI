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

const masterGain = context.createGain();
//const analyzeNode = context.createAnalyser();

/* VCO */
const vco = context.createOscillator();
vco.type = 'square';
//vco.frequency.value = frequency;


/* VCA */
const vca = context.createGain();
vca.gain.value = 0;



/* Connections */
vco.connect(vca);
vca.connect(masterGain);
//vca.connect(analyzeNode);
//analyzeNode.connect(masterGain);




//analyzeNode.connect(masterGain);

masterGain.gain.value = 0.3;
masterGain.connect(context.destination);


vco.start(0);


keyboard.keyDown = (_, frequency) => {
  vco.frequency.value = frequency;
  vca.gain.value = 1;
};

keyboard.keyUp = (_, _) => {
  vca.gain.value = 0;
};

/*
let nodes = [];



keyboard.keyDown = (note, frequency) => {
  
  nodes.push(oscillator);
};



keyboard.keyUp = (note, frequency) => {
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
keyboard = new window.QwertyHancock(settings);

*/


/* visualizar */
/*
function visualize(analyzer) {
  const WIDTH = viCanvas.width;
  const HEIGHT = viCanvas.height;

  analyzer.fftSize = 2048;
  const bufferLength = analyzer.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  vcctx.clearRect(0, 0, WIDTH, HEIGHT);

  const draw = () => {
    requestAnimationFrame(draw);
    analyzer.getByteTimeDomainData(dataArray);

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

*/

