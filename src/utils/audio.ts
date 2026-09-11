// Web Audio API Sound Synthesizer for Tug of War Game
class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Còi trọng tài bắt đầu trận đấu
  playWhistle() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(2800, now + 0.1);
      osc.frequency.setValueAtTime(2600, now + 0.2);

      // Tremolo / whistle warble
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(25, now);
      lfoGain.gain.setValueAtTime(150, now);
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + 0.4);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Audio context might fail on non-interacted tab
    }
  }

  // Âm thanh kéo dây kịch tính (tiếng dây căng và tiếng gồng lực)
  playPull() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Low bass heave
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(90, now);
      bassOsc.frequency.exponentialRampToValueAtTime(50, now + 0.35);

      bassGain.gain.setValueAtTime(0.25, now);
      bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      // Filter for rope swoosh
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.linearRampToValueAtTime(1200, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.35);

      bassOsc.connect(filter);
      filter.connect(bassGain);
      bassGain.connect(ctx.destination);

      bassOsc.start(now);
      bassOsc.stop(now + 0.35);

      // Snap / tension click
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'sine';
      snapOsc.frequency.setValueAtTime(520, now);
      snapOsc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      snapGain.gain.setValueAtTime(0.2, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);

      snapOsc.start(now);
      snapOsc.stop(now + 0.12);
    } catch {
      // ignore
    }
  }

  // Âm thanh trả lời đúng (ding chuông)
  playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.001, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.4);
      });
    } catch {
      // ignore
    }
  }

  // Âm thanh trả lời sai (tiếng buzz trầm)
  playWrong() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.setValueAtTime(110, now + 0.15);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // ignore
    }
  }

  // Âm thanh chiến thắng hào hứng
  playWin() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const melody = [
        { note: 523.25, time: 0, dur: 0.15 },
        { note: 523.25, time: 0.15, dur: 0.15 },
        { note: 523.25, time: 0.30, dur: 0.15 },
        { note: 659.25, time: 0.45, dur: 0.3 },
        { note: 783.99, time: 0.75, dur: 0.2 },
        { note: 1046.5, time: 0.95, dur: 0.6 }
      ];

      melody.forEach(({ note, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, now + time);

        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.linearRampToValueAtTime(0.22, now + time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur);
      });
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEffects();
