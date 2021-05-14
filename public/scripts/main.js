'use strict';


const AudioContext = window.AudioContext || window.webkitAudioContext;



const tapStart = typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown';
const tapMove = typeof document.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove';
const tapEnd = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';

// AudioContext 着火のおまじない
document.addEventListener(tapEnd, initAudioContext);
function initAudioContext(){
  document.removeEventListener(tapEnd, initAudioContext);
  // wake up AudioContext
  actx.resume();
  isPlaying = true;
}






const statusWave = document.querySelector('.btn');
const initStr = statusWave.textContent;


let isPlaying = false;
const waves = ['sine', 'square', 'sawtooth', 'triangle'];

document.querySelector('body').addEventListener(tapStart, () => {
  if (isPlaying) {
    statusWave.textContent = initStr;
    actx.suspend();
    isPlaying = false;
    // todo: `waves` を順繰り回す(非効率)
    waves.push(osc.type);
    waves.shift();
    osc.type = waves[0];
  } else {
    actx.resume();
    isPlaying = true;
    statusWave.textContent = waves[0];
  }
});



const actx = new AudioContext();
const analyser = actx.createAnalyser();
const osc = actx.createOscillator();
/* todo: 差がわからない
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;
*/
osc.type = waves[0];
osc.connect(analyser);
analyser.connect(actx.destination);
osc.start();



const canvas = document.querySelector('.visualizer');
const cctx = canvas.getContext("2d");
const intendedWidth = document.querySelector('.wrapper').clientWidth;
canvas.setAttribute('width', intendedWidth);
//canvas.setAttribute('height', intendedWidth);

function visualize() {
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  cctx.clearRect(0, 0, WIDTH, HEIGHT);
  
  const draw = () => {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    
    cctx.fillStyle = 'rgb(3, 3, 3)';
    cctx.fillRect(0, 0, WIDTH, HEIGHT);
    cctx.lineWidth = 1;
    cctx.strokeStyle = 'rgb(0, 255, 0)';
    cctx.beginPath();
    const sliceWidth = WIDTH * 1.0 / bufferLength;
    
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * HEIGHT / 2;
      i === 0 ? cctx.moveTo(x, y) : cctx.lineTo(x, y);
      x += sliceWidth;
    }
    cctx.lineTo(canvas.width, canvas.height / 2);
    cctx.stroke();
    
  };
  draw();
}

visualize();

