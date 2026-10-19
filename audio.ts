// Web Audio API Sound Synthesizer for Harry Potter Magic Effects
// Zero external assets required, fully self-contained and reliable

class MagicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientInterval: number | null = null;
  private isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ambientInterval) {
      this.stopAmbient();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Wand chime / spark sound
  public playWandSpark() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.45);
      });
    } catch {
      // Audio context may be restricted by browser policy before user interaction
    }
  }

  // Lumos: bright ascending shimmering chime
  public playLumos() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.6);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    } catch {}
  }

  // Expecto Patronum: deep resonant magic sweep
  public playPatronus() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 1.2);

      osc2.frequency.setValueAtTime(330, now);
      osc2.frequency.exponentialRampToValueAtTime(1320, now + 1.2);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.45);
      osc2.stop(now + 1.45);
    } catch {}
  }

  // Sorting Hat declaration gong / chime
  public playSortingChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chords = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6

      chords.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.9);
      });
    } catch {}
  }

  // Owl flutter / envelope arrival
  public playOwlDelivery() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Owl 'hoo-hoo'
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(520, now + 0.15);
      osc.frequency.setValueAtTime(640, now + 0.25);
      osc.frequency.linearRampToValueAtTime(480, now + 0.5);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.18);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.28);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {}
  }

  // Toggle ambient magical theme (gentle celesta harp inspired melody)
  public toggleAmbient(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public isMusicPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  public startAmbient() {
    if (this.isMuted) this.isMuted = false;
    this.initCtx();
    this.isAmbientPlaying = true;

    // Hedwig-inspired arpeggio in B minor / E minor
    const melody = [
      { note: 493.88, dur: 0.5 }, // B4
      { note: 659.25, dur: 0.75 }, // E5
      { note: 783.99, dur: 0.35 }, // G5
      { note: 739.99, dur: 0.45 }, // F#5
      { note: 659.25, dur: 0.9 }, // E5
      { note: 987.77, dur: 0.5 }, // B5
      { note: 880.00, dur: 1.1 }, // A5
      { note: 739.99, dur: 1.1 }, // F#5
      { note: 659.25, dur: 0.75 }, // E5
      { note: 783.99, dur: 0.35 }, // G5
      { note: 739.99, dur: 0.45 }, // F#5
      { note: 622.25, dur: 0.9 }, // D#5
      { note: 698.46, dur: 0.7 }, // F5
      { note: 493.88, dur: 1.3 }, // B4
    ];

    let noteIndex = 0;
    const playNextNote = () => {
      if (!this.isAmbientPlaying || !this.ctx || this.isMuted) return;

      const item = melody[noteIndex % melody.length];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + item.dur * 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + item.dur * 1.25);

      noteIndex++;
      this.ambientInterval = window.setTimeout(playNextNote, item.dur * 1000);
    };

    playNextNote();
  }

  public stopAmbient() {
    this.isAmbientPlaying = false;
    if (this.ambientInterval) {
      clearTimeout(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

export const magicAudio = new MagicAudioEngine();
