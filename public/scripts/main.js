import { wavVisualize } from './visualize.js';
import { barVisualize } from './visualize.js';

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
  musicalTyping: false,
};

let keyboard = new window.QwertyHancock(settings);

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const wavAnalyzeNode = context.createAnalyser();
const barAnalyzeNode = context.createAnalyser();

wavAnalyzeNode.minDecibels = -90;
wavAnalyzeNode.maxDecibels = -10;
wavAnalyzeNode.smoothingTimeConstant = 0.85;

barAnalyzeNode.minDecibels = -90;
barAnalyzeNode.maxDecibels = -10;
barAnalyzeNode.smoothingTimeConstant = 0.85;

const masterGain = context.createGain();

masterGain.gain.value = 0.5;

masterGain.connect(wavAnalyzeNode);
wavAnalyzeNode.connect(barAnalyzeNode);
barAnalyzeNode.connect(context.destination);

// xxx: アナライザが先かマスターが先か
//analyzeNode.connect(masterGain);
//masterGain.connect(context.destination);

let nodes = [];
keyboard.keyDown = (note, frequency) => {
  const oscillator = context.createOscillator();
  //oscillator.type = 'sine';
  oscillator.type = 'square';
  //oscillator.type = 'sawtooth';
  //oscillator.type = 'triangle';
  oscillator.frequency.value = frequency;

  //oscillator.connect(analyzeNode);
  oscillator.connect(masterGain);
  oscillator.start(0);

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
//keyboard = new window.QwertyHancock(settings);

// Visualize
const waveCanvas = document.querySelector('#waveVisualizer');
const barCanvas = document.querySelector('#barVisualizer');

wavVisualize(waveCanvas, wavAnalyzeNode);
barVisualize(barCanvas, barAnalyzeNode);
