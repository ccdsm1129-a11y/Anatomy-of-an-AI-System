const EXPLORED_KEY = 'ai-anatomy:explored';
const SOUND_KEY = 'ai-anatomy:sound';
const VIEW_KEY = 'ai-anatomy:view';

export function loadExplored(): Set<string> {
  try {
    const raw = localStorage.getItem(EXPLORED_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export function saveExplored(explored: Set<string>): void {
  try {
    localStorage.setItem(EXPLORED_KEY, JSON.stringify([...explored]));
  } catch {
    /* 忽略（隐私模式 / 配额） */
  }
}

export function loadSound(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) !== 'off';
  } catch {
    return true;
  }
}

export function saveSound(on: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, on ? 'on' : 'off');
  } catch {
    /* 忽略 */
  }
}

export function loadView(): 'full' | 'brain' {
  try {
    const v = localStorage.getItem(VIEW_KEY);
    return v === 'brain' ? 'brain' : 'full';
  } catch {
    return 'full';
  }
}

export function saveView(view: 'full' | 'brain'): void {
  try {
    localStorage.setItem(VIEW_KEY, view);
  } catch {
    /* 忽略 */
  }
}
