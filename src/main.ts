import { initNav } from './ui/nav';
import { initCanvas } from './ui/canvas';
import { initPanel } from './ui/panel';
import { initDemo } from './ui/demo';
import { store } from './state/store';
import { unlockAudio } from './audio/sound';

function initMobileChrome(): void {
  const app = document.getElementById('app')!;
  const menuBtn = document.getElementById('menu-btn');
  const panelBtn = document.getElementById('panel-btn');
  const scrim = document.getElementById('scrim');

  menuBtn?.addEventListener('click', () => {
    app.classList.toggle('nav-open');
    app.classList.remove('panel-open');
  });
  panelBtn?.addEventListener('click', () => {
    app.classList.toggle('panel-open');
    app.classList.remove('nav-open');
  });
  scrim?.addEventListener('click', () => {
    app.classList.remove('nav-open', 'panel-open');
  });
}

function initSoundLabel(): void {
  const state = document.getElementById('sound-state');
  const toggle = document.getElementById('sound-toggle');
  const apply = (s: { soundOn: boolean }) => {
    if (state) state.textContent = s.soundOn ? '开' : '关';
    toggle?.setAttribute('aria-pressed', String(s.soundOn));
  };
  apply(store.get());
  store.subscribe(apply);
}

function initAudioUnlock(): void {
  const unlock = () => {
    unlockAudio();
    document.removeEventListener('pointerdown', unlock);
    document.removeEventListener('keydown', unlock);
  };
  document.addEventListener('pointerdown', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });
}

initNav();
initCanvas();
initPanel();
initDemo();
initMobileChrome();
initSoundLabel();
initAudioUnlock();