export default class Synth {
  constructor() {
    try {
      this.AudioContext = window.AudioContext || window.webkitAudioContext
    } catch (e) {
      throw new Error('Web Audio isn\'t supported in this browser!');
    }
    this.isPlaying;
    this.init();
  }
  
  init() {
    this.isPlaying = false;
    
    this.attack  = 0.5;
    this.decay   = 0.3;
    this.sustain = 0.5;
    this.release = 1.0;
    
    this.auctx = new this.AudioContext();
    //this.gainNode = this.auctx.createGain();
    this.eg = this.auctx.createGain();
    this.masterVolume = this.auctx.createGain();
    this.analyzeNode = this.auctx.createAnalyser();
    this.oscNode = this.auctx.createOscillator();
    
    this.oscNode.frequency.value = 220;
    
    this.oscNode.connect(this.eg);
    this.eg.connect(this.analyzeNode);
    this.analyzeNode.connect(this.auctx.destination);
    
    this.t0 = this.auctx.currentTime;
    this.t1 = this.t0 + attack;
    this.eg.gain.linearRampToValueAtTime(1, this.t1);
    /*
    this.t2 = decay;
    this.t2Value = sustain;
    this.eg.gain.setTargetAtTime(this.t2Value, this.t1, this.t2);
    this.t3 = this.auctx.currentTime;
    this.t4 = release;
    this.eg.gain.setTargetAtTime(0, this.t3, this.t4);
    this.intervalid = null;
    this.intervalid = window.setInterval(function() {
      const VALUE_OF_STOP = 1e-3;
      if (eg.gain.value < VALUE_OF_STOP) {
        this.oscNode.stop(0);
        if (intervalid !== null) {
          window.clearInterval(this.intervalid);
          this.intervalid = null;
        }
      }
    })*/
    
  }
  
  
  
  play() {
    this.init();
    this.oscNode.start(this.t0);
    this.isPlaying = true;
    
    
  }
  
  end() {
    this.oscNode.stop();
    this.isPlaying = false;
    
  }
}
