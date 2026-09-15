/**
 * 触感音效 — Web Audio API 合成。
 * 风格：纸张轻触、木质按钮、细小机械卡扣。
 * 极短、低音量、无侵扰；仅在用户首次主动交互后才初始化 AudioContext。
 */

let ctx: AudioContext | null = null;

function ensureCtx(): AudioContext | null {
  if (ctx) return ctx;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    return ctx;
  } catch {
    return null;
  }
}

/** 用户手势中调用：解锁并挂起→恢复 */
export function unlockAudio(): void {
  const c = ensureCtx();
  if (c && c.state === 'suspended') {
    c.resume().catch(() => {});
  }
}

function blip(freq: number, duration: number, gain: number, type: OscillatorType, when = 0): void {
  const c = ensureCtx();
  if (!c) return;
  const t0 = c.currentTime + when;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

/** 木质轻触（选择结构） */
export function playSelect(): void {
  blip(180, 0.05, 0.06, 'triangle');
  blip(320, 0.04, 0.03, 'sine', 0.01);
}

/** 纸张轻触（悬停，更轻） */
export function playHover(): void {
  blip(900, 0.02, 0.012, 'sine');
}

/** 机械卡扣（切换视图/开关） */
export function playToggle(): void {
  blip(240, 0.03, 0.04, 'square');
  blip(160, 0.05, 0.03, 'triangle', 0.02);
}

/** 演示步进 */
export function playStep(): void {
  blip(220, 0.04, 0.05, 'triangle');
  blip(440, 0.05, 0.03, 'sine', 0.015);
}
