'use strict';


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

//analyzeNode.connect(masterGain);
//masterGain.connect(context.destination);

let nodes = [];
keyboard.keyDown = (note, frequency) => {
  const oscillator = context.createOscillator();
  oscillator.type = 'square';
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

 

 
/* Visualizar */
/*
function visualize() {
  const WIDTH = viCanvas.width;
  const HEIGHT = viCanvas.height;

  analyzeNode.fftSize = 2048;
  //const bufferLength = analyzeNode.frequencyBinCount;
  const bufferLength = analyzeNode.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  vcctx.clearRect(0, 0, WIDTH, HEIGHT);

  draw();
  function draw() {
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
}
*/

function wavVisualize(canvasTag, analyze) {
  const vcctx = canvasTag.getContext("2d");
  const intendedWidth = document.querySelector('.wrapper').clientWidth;
  canvasTag.setAttribute('width', intendedWidth);
  canvasTag.setAttribute('height', intendedWidth / 3)
  const WIDTH = canvasTag.width;
  const HEIGHT = canvasTag.height;
  
  const wavAnalyze = analyze;

  wavAnalyze.fftSize = 2048;
  const bufferLength = wavAnalyze.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  vcctx.clearRect(0, 0, WIDTH, HEIGHT);

  draw();
  function draw() {
    requestAnimationFrame(draw);
    wavAnalyze.getByteTimeDomainData(dataArray);

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
    vcctx.lineTo(canvasTag.width, canvasTag.height / 2);
    vcctx.stroke();
  };
}


function barVisualize(canvasTag, analyze) {
  const vcctx = canvasTag.getContext("2d");
  const intendedWidth = document.querySelector('.wrapper').clientWidth;
  canvasTag.setAttribute('width', intendedWidth);
  canvasTag.setAttribute('height', intendedWidth / 3)
  const WIDTH = canvasTag.width;
  const HEIGHT = canvasTag.height;
  const barAnalyze = analyze;
  barAnalyze.fftSize = 256;

  
  const bufferLengthAlt = barAnalyze.frequencyBinCount;
  console.log(bufferLengthAlt);
  

  const dataArrayAlt = new Uint8Array(bufferLengthAlt);
  vcctx.clearRect(0, 0, WIDTH, HEIGHT);
  
  drawAlt();
  function drawAlt() {
    requestAnimationFrame(drawAlt);
    
    barAnalyze.getByteFrequencyData(dataArrayAlt);
    
    vcctx.fillStyle = 'rgb(233, 233, 233)';
    vcctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    const barWidth = (WIDTH / bufferLengthAlt) * 2.5;
    
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLengthAlt; i++) {
      barHeight = dataArrayAlt[i];
      vcctx.fillStyle = `rgb(${barHeight+64}, 64, 64)`;
      vcctx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
      x += barWidth + 1;
    }
  };
}



const waveCanvas = document.querySelector('#waveVisualizer');
const barCanvas = document.querySelector('#barVisualizer');

//const vcctx = viCanvas.getContext("2d");
//const intendedWidth = document.querySelector('.wrapper').clientWidth;
//viCanvas.setAttribute('width', intendedWidth);
//viCanvas.setAttribute('height', intendedWidth / 3);

wavVisualize(waveCanvas, wavAnalyzeNode);
barVisualize(barCanvas, barAnalyzeNode);
//wavVisualize(barCanvas);
