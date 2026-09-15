import { SYSTEMS } from '../data/systems';
import { STRUCTURE_BY_ID } from '../data/structures';
import { store } from '../state/store';
import { playSelect, playToggle, unlockAudio } from '../audio/sound';

export function initNav(): void {
  const systemsEl = document.getElementById('systems')!;
  const progressCount = document.getElementById('progress-count')!;
  const progressTotal = document.getElementById('progress-total')!;
  const progressFill = document.getElementById('progress-fill')!;

  progressTotal.textContent = String(STRUCTURE_BY_ID ? Object.keys(STRUCTURE_BY_ID).length : 20);

  // 渲染六大系统
  systemsEl.innerHTML = SYSTEMS.map((sys) => {
    const items = sys.structureIds
      .map((sid) => {
        const s = STRUCTURE_BY_ID[sid];
        if (!s) return '';
        return `
          <li>
            <button class="structure-item" data-id="${s.id}">
              ${s.nameZh}<span class="en">${s.nameEn}</span>
            </button>
          </li>`;
      })
      .join('');
    return `
      <div class="system-group" data-system="${sys.id}">
        <button class="system-head" aria-expanded="true">
          <span class="system-dot" style="background:${sys.color}"></span>
          <span>${sys.nameZh}</span>
          <span class="system-caret">▾</span>
        </button>
        <ul class="structure-list">${items}</ul>
      </div>`;
  }).join('');

  // 系统折叠
  systemsEl.querySelectorAll<HTMLButtonElement>('.system-head').forEach((head) => {
    head.addEventListener('click', () => {
      const group = head.closest('.system-group')!;
      group.classList.toggle('is-collapsed');
      head.setAttribute('aria-expanded', String(!group.classList.contains('is-collapsed')));
    });
  });

  // 结构点击
  systemsEl.querySelectorAll<HTMLButtonElement>('.structure-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id!;
      unlockAudio();
      store.markExplored(id);
      store.select(id);
      if (store.get().soundOn) playSelect();
      closeNavOnSelect();
    });
  });

  // 视图切换
  document.querySelectorAll<HTMLButtonElement>('.view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      unlockAudio();
      store.setView(btn.dataset.view as 'full' | 'brain');
      if (store.get().soundOn) playToggle();
      closeNavOnSelect();
    });
  });

  // 进度重置
  document.getElementById('progress-reset')!.addEventListener('click', () => {
    unlockAudio();
    store.resetExplored();
  });

  // 声音开关
  document.getElementById('sound-toggle')!.addEventListener('click', () => {
    unlockAudio();
    store.toggleSound();
    if (store.get().soundOn) playToggle();
  });

  // 演示入口由 demo.ts 绑定

  // 订阅状态，更新进度与选中态
  store.subscribe((state) => {
    const total = Object.keys(STRUCTURE_BY_ID).length;
    const n = state.explored.size;
    progressCount.textContent = String(n);
    progressFill.style.width = `${(n / total) * 100}%`;

    document.querySelectorAll<HTMLButtonElement>('.structure-item').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.id === state.selectedId);
    });
    document.querySelectorAll<HTMLButtonElement>('.view-btn').forEach((btn) => {
      const active = btn.dataset.view === state.view;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });
  });
}

/** 平板/移动端选中结构后收起抽屉 */
function closeNavOnSelect(): void {
  const app = document.getElementById('app')!;
  app.classList.remove('nav-open');
}
