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

    this.attack  = 0.0;
    this.decay   = 0.0;
    this.sustain = 0.0;
    this.release = 0.0;

    this.auctx = new this.AudioContext();
    //this.gainNode = this.auctx.createGain();
    this.eg = this.auctx.createGain();
    this.masterVolume = this.auctx.createGain();
    this.analyzeNode = this.auctx.createAnalyser();
    this.oscNode = this.auctx.createOscillator();

    this.oscNode.frequency.value = 220;

    this.oscNode.connect(this.eg);
    this.eg.connect(this.masterVolume);
    this.masterVolume.connect(this.analyzeNode);

    this.analyzeNode.connect(this.auctx.destination);

    this.t0 = this.auctx.currentTime;
    this.t1 = this.t0 + this.attack;
    //this.eg.gain.value = 0;
    //this.eg.gain.setTargetAtTime(1, this.t0, this.t1);
    this.eg.gain.linearRampToValueAtTime(1, this.t1);

    this.t2 = this.decay;
    this.t2Value = this.sustain;
    this.eg.gain.setTargetAtTime(this.t2Value, this.t1, this.t2);
    this.t3 = this.auctx.currentTime;
    this.t4 = this.release;
    this.eg.gain.setTargetAtTime(0, this.t3, this.t4);


  }



  play(wave, freq, attack, decay, sustain) {
    this.init();
    if (this.isPlaying) {
      this.oscNode.stop(0);
    }
    this.oscNode.type = wave;
    this.attack = attack;
    this.decay = decay;
    this.sustain = sustain;
    this.oscNode.frequency.value = freq;
    //this.eg.gain.setTargetAtTime(1, this.t0, this.t1);
    this.t0 = this.auctx.currentTime;
    this.t1 = this.t0 + this.attack;
    this.t2 = this.decay;
    this.t2Value = this.sustain;
    this.eg.gain.linearRampToValueAtTime(1, this.t1);
    this.eg.gain.setTargetAtTime(this.t2Value, this.t1, this.t2);

    this.oscNode.start(this.t0);

    this.isPlaying = true;
    //console.log(typeof this.eg.gain.value);
  }

  end(release) {
    if (!this.isPlaying) {
      return;
    }
    this.release = release;
    this.t3 = this.auctx.currentTime;
    this.t4 = this.release;
    this.eg.gain.cancelScheduledValues(this.t3);
    this.eg.gain.setValueAtTime(this.eg.gain.value, this.t3);
    this.eg.gain.setTargetAtTime(0, this.t3, this.t4);
    this.isPlaying = false;
  }
}
