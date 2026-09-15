import { store } from '../state/store';
import { STRUCTURE_BY_ID } from '../data/structures';
import { SYSTEM_BY_ID } from '../data/systems';
import { DEMO_TASKS } from '../data/taskDemo';
import type { DemoTask } from '../types';
import { playStep, playToggle, unlockAudio } from '../audio/sound';

const STEP_INTERVAL = 4200; // ms
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let task: DemoTask | null = null;
let stepIndex = 0;
let status: 'idle' | 'playing' | 'paused' | 'done' = 'idle';
let timer: number | null = null;

const overlayEl = () => document.getElementById('demo-overlay')!;
const bodyEl = () => document.getElementById('demo-body')!;
const footerEl = () => document.getElementById('demo-footer')!;

export function initDemo(): void {
  document.getElementById('demo-entry')!.addEventListener('click', () => openDemo(0));
  overlayEl().addEventListener('click', (e) => {
    if (e.target === overlayEl()) closeDemo();
  });
}

function openDemo(index: number): void {
  task = DEMO_TASKS[index];
  if (!task) return;
  unlockAudio();
  stepIndex = 0;
  status = 'idle';
  clearTimer();
  store.setView('full');
  store.select(null);
  store.setDemoRunning(true);

  overlayEl().innerHTML = `
    <div class="demo-shell" role="dialog" aria-modal="false" aria-label="${task.title}">
      <div class="demo-header">
        <h2>${task.title}</h2>
        <button class="demo-close" data-act="exit" aria-label="退出演示">×</button>
      </div>
      <div class="demo-body" id="demo-body"></div>
      <div class="demo-footer" id="demo-footer"></div>
    </div>`;
  overlayEl().querySelector('.demo-close')?.addEventListener('click', () => closeDemo());
  overlayEl().hidden = false;

  syncHighlight();
  render();
}

function closeDemo(): void {
  clearTimer();
  status = 'idle';
  store.setDemoActive([]);
  store.setDemoRunning(false);
  overlayEl().hidden = true;
  overlayEl().innerHTML = '';
}

function syncHighlight(): void {
  if (!task || status === 'done' || stepIndex >= task.steps.length) {
    store.setDemoActive([]);
    return;
  }
  store.setDemoActive(task.steps[stepIndex].structureIds);
}

function startTimer(): void {
  clearTimer();
  if (reducedMotion) return; // 尊重减少动效偏好：仅手动步进
  timer = window.setInterval(() => {
    stepIndex += 1;
    if (!task || stepIndex >= task.steps.length) {
      finish();
    } else {
      syncHighlight();
      if (store.get().soundOn) playStep();
      render();
    }
  }, STEP_INTERVAL);
}

function clearTimer(): void {
  if (timer !== null) {
    window.clearInterval(timer);
    timer = null;
  }
}

function finish(): void {
  clearTimer();
  status = 'done';
  store.setDemoActive([]);
  render();
}

function next(): void {
  if (!task) return;
  if (stepIndex + 1 >= task.steps.length) {
    finish();
    return;
  }
  stepIndex += 1;
  status = 'paused';
  clearTimer();
  syncHighlight();
  if (store.get().soundOn) playStep();
  render();
}

function prev(): void {
  if (!task || stepIndex <= 0) return;
  stepIndex -= 1;
  status = 'paused';
  clearTimer();
  syncHighlight();
  if (store.get().soundOn) playStep();
  render();
}

function render(): void {
  if (!task) return;

  if (status === 'done') {
    bodyEl().innerHTML = `
      <div class="demo-summary">
        <div class="big">${task.summary}</div>
        <p style="color:var(--ink-soft);font-size:var(--fs-sm)">这趟旅程依次点亮了感知、记忆、认知、行动、运行与安全系统——大脑只是其中的一环。</p>
      </div>`;
    footerEl().innerHTML = `
      <button class="demo-btn" data-act="restart">重新开始</button>
      <div class="spacer"></div>
      <button class="demo-btn" data-act="exit">退出</button>`;
  } else {
    const step = task.steps[stepIndex];
    const chips = step.structureIds
      .map((sid) => {
        const s = STRUCTURE_BY_ID[sid];
        if (!s) return '';
        const color = SYSTEM_BY_ID[s.system].color;
        return `<span class="chip" style="background:${color}">${s.nameZh}</span>`;
      })
      .join('');

    bodyEl().innerHTML = `
      <div class="demo-progress">第 ${stepIndex + 1} 步 / 共 ${task.steps.length} 步</div>
      <h3 class="demo-step-title">${step.title}</h3>
      <p class="demo-narration">${step.narration}</p>
      <div class="demo-active-structures">${chips}</div>
      <div class="demo-io">
        <div class="io-box"><h4>输入</h4><p>${step.input}</p></div>
        <div class="io-box"><h4>处理</h4><p>${step.process}</p></div>
        <div class="io-box"><h4>输出</h4><p>${step.output}</p></div>
      </div>`;

    if (status === 'playing') {
      footerEl().innerHTML = `
        <button class="demo-btn" data-act="exit">退出</button>
        <div class="spacer"></div>
        <button class="demo-btn" data-act="prev">上一步</button>
        <button class="demo-btn primary" data-act="pause">暂停</button>`;
    } else if (status === 'paused') {
      footerEl().innerHTML = `
        <button class="demo-btn" data-act="exit">退出</button>
        <div class="spacer"></div>
        <button class="demo-btn" data-act="prev">上一步</button>
        <button class="demo-btn primary" data-act="resume">继续</button>
        <button class="demo-btn" data-act="next">下一步</button>`;
    } else {
      footerEl().innerHTML = `
        <button class="demo-btn" data-act="exit">退出</button>
        <div class="spacer"></div>
        <button class="demo-btn primary" data-act="start">开始</button>`;
    }
  }

  footerEl().querySelectorAll<HTMLButtonElement>('.demo-btn').forEach((btn) => {
    btn.addEventListener('click', () => handleAction(btn.dataset.act!));
  });
}

function handleAction(act: string): void {
  unlockAudio();
  switch (act) {
    case 'start':
      status = 'playing';
      startTimer();
      if (store.get().soundOn) playStep();
      render();
      break;
    case 'pause':
      status = 'paused';
      clearTimer();
      if (store.get().soundOn) playToggle();
      render();
      break;
    case 'resume':
      status = 'playing';
      startTimer();
      if (store.get().soundOn) playStep();
      render();
      break;
    case 'next':
      next();
      break;
    case 'prev':
      prev();
      break;
    case 'restart':
      stepIndex = 0;
      status = 'playing';
      syncHighlight();
      startTimer();
      render();
      break;
    case 'exit':
      closeDemo();
      break;
  }
}
