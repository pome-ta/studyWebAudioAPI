export default class Synth {
  constructor() {
    try {
      this.AudioContext = window.AudioContext || window.webkitAudioContext
    } catch (e) {
      throw new Error('Web Audio isn\'t supported in this browser!');
    }
  }
  
  init() {
    this.auctx = new this.AudioContext();
    console.log("ini", this.context);
  }
  
  play() {
    
  }
  
  end() {
    
  }
}