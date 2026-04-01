/** Tiny programmatic sound effects via Web Audio API */
let _ctx: AudioContext | null = null;

function ctx(): AudioContext {
  if (!_ctx) _ctx = new AudioContext();
  return _ctx;
}

function beep(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.18) {
  try {
    const ac = ctx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + dur);
  } catch (_) { /* ignore */ }
}

export function playSound(type: 'correct' | 'wrong' | 'xp' | 'badge' | 'click') {
  switch (type) {
    case 'correct': beep(660, 0.15); setTimeout(() => beep(880, 0.15), 120); break;
    case 'wrong':   beep(220, 0.25, 'sawtooth', 0.12); break;
    case 'xp':      beep(520, 0.1); setTimeout(() => beep(660, 0.1), 90); break;
    case 'badge':   beep(440, 0.1); setTimeout(() => beep(660, 0.1), 90); setTimeout(() => beep(880, 0.15), 180); break;
    case 'click':   beep(440, 0.06, 'triangle', 0.1); break;
  }
}
