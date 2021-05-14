'use strict';


const AudioContext = window.AudioContext || window.webkitAudioContext;


const {tapStart, tapMove, tapEnd} = {
  tapStart: typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown',
  tapMove: typeof document.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove',
  tapEnd: typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup',
}



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
/*
document.querySelector('body').addEventListener(tapStart, () => {
  if (isPlaying) {
    statusWave.textContent = initStr;
    actx.suspend();
    isPlaying = false;
    // todo: `waves` を順繰り回す(非効率)
    waves.push(oscNode.type);
    waves.shift();
    oscNode.type = waves[0];
  } else {
    actx.resume();
    isPlaying = true;
    statusWave.textContent = waves[0];
  }
});
*/


const volumeControl = document.querySelector('#volume');

volumeControl.addEventListener('input', function() {
  gainNode.gain.value = this.value;
  
}, false);



const actx = new AudioContext();
const analyser = actx.createAnalyser();
const oscNode = actx.createOscillator();
oscNode.frequency.value = 220;
/* todo: 差がわからない
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;
*/

const gainNode = actx.createGain();

oscNode.type = waves[0];
//oscNode.connect(analyser);
oscNode.connect(gainNode);
gainNode.connect(analyser);
analyser.connect(actx.destination);
oscNode.start();



const viCanvas = document.querySelector('.visualizer');
const vcctx = viCanvas.getContext("2d");
const intendedWidth = document.querySelector('.wrapper').clientWidth;
viCanvas.setAttribute('width', intendedWidth);
viCanvas.setAttribute('height', intendedWidth / 2);

function visualize() {
  const WIDTH = viCanvas.width;
  const HEIGHT = viCanvas.height;
  
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  vcctx.clearRect(0, 0, WIDTH, HEIGHT);
  
  const draw = () => {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    
    vcctx.fillStyle = 'rgb(3, 3, 3)';
    vcctx.fillRect(0, 0, WIDTH, HEIGHT);
    vcctx.lineWidth = 1;
    vcctx.strokeStyle = 'rgb(0, 255, 0)';
    vcctx.beginPath();
    const sliceWidth = WIDTH * 1.0 / bufferLength;
    
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * HEIGHT / 2;
      i === 0 ? vcctx.moveTo(x, y) : vcctx.lineTo(x, y);
      x += sliceWidth;
    }
    vcctx.lineTo(viCanvas.width, viCanvas.height / 2);
    vcctx.stroke();
    
  };
  draw();
}

visualize();

