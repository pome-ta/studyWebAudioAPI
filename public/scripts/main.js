'use strict';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const settings = {
  id: 'keyboard',
  width: 600,
  height: 150,
  startNote: 'A2',
  margin: 'auto',
  whiteNotesColour: '#fff',
  blackNotesColour: '#000',
  borderColour: '#000',
  activeColour: 'yellow',
  octaves: 2,
  musicalTyping: false
}

let keyboard = new window.QwertyHancock(settings);

const masterGain = context.createGain();
let nodes = [];

masterGain.gain.value = 0.3;
masterGain.connect(context.destination);

keyboard.keyDown = function (note, frequency) {
  const oscillator = context.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  oscillator.connect(masterGain);
  oscillator.start(0);

  nodes.push(oscillator);
};



keyboard.keyUp = function (note, frequency) {
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

keyboard = new window.QwertyHancock(settings);
