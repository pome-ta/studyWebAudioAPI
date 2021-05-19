import Synth from './Synth.js';

const {tapStart, tapMove, tapEnd} = {
  tapStart: typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown',
  tapMove: typeof document.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove',
  tapEnd: typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup',
}


const synth = new Synth();

const toneControl = document.querySelector('.tone');

/* setControls */
const volControl = document.querySelector('#vol-range');
const frqControl = document.querySelector('#frq-range');

const aControl = document.querySelector('#a-range');
const dControl = document.querySelector('#d-range');
const sControl = document.querySelector('#s-range');
const rControl = document.querySelector('#r-range');

/* setValues */
const volValue = document.querySelector('#vol-param');
const frqValue = document.querySelector('#frq-param');

const aValue = document.querySelector('#a-param');
const dValue = document.querySelector('#d-param');
const sValue = document.querySelector('#s-param');
const rValue = document.querySelector('#r-param');


// todo : python のzip 的なのを考えてたい
const setControls = [volControl, frqControl, aControl, dControl, sControl, rControl];
const setValues = [volValue, frqValue, aValue, dValue, sValue, rValue];

// 初期化
(function (rng, prm) {
  for (let i=0; i < rng.length; i++) {
    prm[i].innerHTML = rng[i].value;
  }
}(setControls, setValues));





toneControl.addEventListener(tapStart, (e) => {
  e.preventDefault();
  synth.play(0,0,0);
});

toneControl.addEventListener(tapEnd, () => {
  synth.end(0);
});

volControl.addEventListener('input', function() {
  synth.masterVolume.gain.setValueAtTime(this.value, synth.auctx.currentTime);
  volValue.innerHTML = this.value;
});

frqControl.addEventListener('input', function() {
  synth.oscNode.frequency.setValueAtTime(this.value, synth.auctx.currentTime);
  frqValue.innerHTML = this.value;
});



aControl.addEventListener('input', function() {
  // synth.oscNode.frequency.setValueAtTime(this.value, synth.auctx.currentTime);
  aValue.innerHTML = this.value;
});
dControl.addEventListener('input', function() {
  // synth.oscNode.frequency.setValueAtTime(this.value, synth.auctx.currentTime);
  dValue.innerHTML = this.value;
});
sControl.addEventListener('input', function() {
  // synth.oscNode.frequency.setValueAtTime(this.value, synth.auctx.currentTime);
  sValue.innerHTML = this.value;
});
rControl.addEventListener('input', function() {
  // synth.oscNode.frequency.setValueAtTime(this.value, synth.auctx.currentTime);
  rValue.innerHTML = this.value;
});

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
viCanvas.setAttribute('height', intendedWidth / 2);

visualize();

