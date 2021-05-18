import Synth from './Synth.js';



const {tapStart, tapMove, tapEnd} = {
  tapStart: typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown',
  tapMove: typeof document.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove',
  tapEnd: typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup',
}


const synth = new Synth();

document.querySelector('.tone').addEventListener(tapStart, (e) => {
  e.preventDefault();
  synth.play();
});


document.querySelector('.tone').addEventListener(tapEnd, () => {
  synth.end();
});



const volumeControl = document.querySelector('#volume');
volumeControl.addEventListener('input', function() {
  synth.eg.gain.value = this.value;
});

const freqControl = document.querySelector('#freq');
freqControl.addEventListener('input', function() {
  //gainNode.gain.value = this.value;
  synth.oscNode.frequency.setValueAtTime(this.value, synth.auctx.currentTime);
  
}, false);


/* visualizar */
function visualize() {
  const WIDTH = viCanvas.width;
  const HEIGHT = viCanvas.height;
  
  synth.analyzeNode.fftSize = 2048;
  const bufferLength = synth.analyzeNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  vcctx.clearRect(0, 0, WIDTH, HEIGHT);
  
  const draw = () => {
    requestAnimationFrame(draw);
    synth.analyzeNode.getByteTimeDomainData(dataArray);
    
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
viCanvas.setAttribute('height', intendedWidth / 2);

visualize();

