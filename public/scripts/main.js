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
let nodes = [];

masterGain.gain.value = 0.3;
masterGain.connect(context.destination);

keyboard.keyDown = (_, frequency) => {
  const oscillator = context.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  const analyzeNode = context.createAnalyser();
  oscillator.connect(analyzeNode);
  analyzeNode.connect(masterGain);
  oscillator.start(0);
  visualize(analyzeNode);
  

  nodes.push(oscillator);
};



keyboard.keyUp = (_, frequency) => {
  const newNodes = [];

  for (let i = 0; i < nodes.length; i++) {
    if (Math.round(nodes[i].frequency.value) === Math.round(frequency)) {
      nodes[i].stop(0);
      nodes[i].disconnect();
    } else {
      newNodes.push(nodes[i]);
    }
  }

  nodes = newNodes;
};

// xxx: 🤔
keyboard = new window.QwertyHancock(settings);




/* visualizar */
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

 