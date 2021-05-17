export default class Synth {
  constructor() {
    try {
      this.AudioContext = window.AudioContext || window.webkitAudioContext
    } catch (e) {
      throw new Error('Web Audio isn\'t supported in this browser!');
    }
    this.isPlaying;
    this.auctx = new this.AudioContext();
    this.gainNode = this.auctx.createGain();
    this.analyzeNode = this.auctx.createAnalyser();
    this.oscNode = this.auctx.createOscillator();
  }
  
  init() {
    this.isPlaying = false;
    this.auctx = new this.AudioContext();
    this.gainNode = this.auctx.createGain();
    this.analyzeNode = this.auctx.createAnalyser();
    this.oscNode = this.auctx.createOscillator();
    
    this.oscNode.frequency.value = 220;
    this.oscNode.connect(this.gainNode);
    
    this.gainNode.connect(this.analyzeNode);
    this.analyzeNode.connect(this.auctx.destination);
  }
  
  
  
  play() {
    this.init();
    this.oscNode.start();
    this.isPlaying = true;
    
    
  }
  
  end() {
    this.oscNode.stop();
    this.isPlaying = false;
    
  }
}
