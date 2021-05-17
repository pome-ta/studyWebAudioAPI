const {tapStart, tapMove, tapEnd} = {
  tapStart: typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown',
  tapMove: typeof document.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove',
  tapEnd: typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup',
}

export default class Synth {
  constructor() {
    try {
      this.AudioContext = window.AudioContext || window.webkitAudioContext
    } catch (e) {
      throw new Error('Web Audio isn\'t supported in this browser!');
    }
    this.isPlaying;
  }
  
  init() {
    this.isPlaying = false;
    this.auctx = new this.AudioContext();
    this.gainNode = this.auctx.createGain();
    this.oscNode = this.auctx.createOscillator();
    
    this.oscNode.frequency.value = 220;
    this.oscNode.connect(this.gainNode);
    this.gainNode.connect(this.auctx.destination);
    

    //this.oscNode.start();
    
    //console.log("ini", this.context);
  }
  
  
  
  play() {
    this.init();
    this.oscNode.start();
    /*
    document.addEventListener(tapEnd, initAudioContext);
    function initAudioContext(){
      document.removeEventListener(tapEnd, initAudioContext);
      // wake up AudioContext
      //this.auctx.resume();
      //console.log('hoge');
      //this.oscNode.start();
    }
    */
    this.isPlaying = true;
    
    
  }
  
  end() {
    this.oscNode.stop();
    this.isPlaying = false;
    
  }
}
