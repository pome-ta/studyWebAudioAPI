'use strict';


const canvas = document.querySelector('.visualizer');
const canvasCtx = canvas.getContext("2d");
const intendedWidth = document.querySelector('.wrapper').clientWidth;
canvas.setAttribute('width', intendedWidth);

const drawVisual;



const AudioContext = window.AudioContext || window.webkitAudioContext;
const actx = new AudioContext();
const analyser = actx.createAnalyser();
const osc = actx.createOscillator();

osc.connect(analyser);
analyser.connect(actx.destination);
visualize()
osc.start();
console.log("おわり");


// 着火のおまじない
const eventName = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';
document.addEventListener(eventName, initAudioContext);
function initAudioContext(){
  document.removeEventListener(eventName, initAudioContext);
  // wake up AudioContext
  actx.resume();
}


function visualize() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  
  const draw = function() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();
  }
  

}



function draw() {
  
}




console.log(intendedWidth);

