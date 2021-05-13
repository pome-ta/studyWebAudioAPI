'use strict';


const AudioContext = window.AudioContext || window.webkitAudioContext;

// AudioContext 着火のおまじない
const eventName = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';
document.addEventListener(eventName, initAudioContext);
function initAudioContext(){
  document.removeEventListener(eventName, initAudioContext);
  // wake up AudioContext
  actx.resume();
}


const actx = new AudioContext();
const analyser = actx.createAnalyser();
const osc = actx.createOscillator();
/* todo: 差がわからない
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;
*/

osc.connect(analyser);
analyser.connect(actx.destination);
osc.start();



const canvas = document.querySelector('.visualizer');
const canvasCtx = canvas.getContext("2d");
const intendedWidth = document.querySelector('.wrapper').clientWidth;
canvas.setAttribute('width', intendedWidth);
//canvas.setAttribute('height', intendedWidth);

function visualize() {
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  
  const draw = () => {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    
    canvasCtx.fillStyle = 'rgb(3, 3, 3)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 255, 0)';
    canvasCtx.beginPath();
    const sliceWidth = WIDTH * 1.0 / bufferLength;
    
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * HEIGHT / 2;
      i === 0 ? canvasCtx.moveTo(x, y) : canvasCtx.lineTo(x, y);
      x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
    
  };
  draw();
}

visualize();

