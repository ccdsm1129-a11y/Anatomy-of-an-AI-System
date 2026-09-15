import { store } from '../state/store';
import { STRUCTURES, STRUCTURE_BY_ID } from '../data/structures';
import { SYSTEM_BY_ID } from '../data/systems';
import { playSelect, unlockAudio } from '../audio/sound';

export function initPanel(): void {
  const content = document.getElementById('panel-content')!;
  const closeBtn = document.getElementById('panel-close')!;

  closeBtn.addEventListener('click', () => {
    document.getElementById('app')!.classList.remove('panel-open');
  });

  store.subscribe(render);
  render();

  function render(): void {
    const state = store.get();
    const id = state.selectedId;

    if (!id || !STRUCTURE_BY_ID[id]) {
      content.innerHTML = `
        <div class="panel-empty">
          <p>点击人体区域或左侧列表中的结构，开始探索。</p>
          <p>建议从「大脑」开始——它是 AI 的核心，但远不是全部。</p>
        </div>`;
      return;
    }

    const s = STRUCTURE_BY_ID[id];
    const sys = SYSTEM_BY_ID[s.system];
    const idx = STRUCTURES.findIndex((x) => x.id === id);
    const prev = idx > 0 ? STRUCTURES[idx - 1] : null;
    const next = idx >= 0 && idx < STRUCTURES.length - 1 ? STRUCTURES[idx + 1] : null;

    content.innerHTML = `
      <div class="panel-kicker">${sys.nameZh} · ${sys.nameEn}</div>
      <h2 class="panel-title">${s.nameZh}</h2>
      <p class="panel-en">${s.enTerm}</p>
      <p class="panel-def">${s.definition}</p>
      ${s.mappingNote ? `<div class="mapping-note">映射说明：${s.mappingNote}</div>` : ''}

      <div class="panel-section">
        <h3>它做什么</h3>
        <ul>${s.processes.map((p) => `<li>${p}</li>`).join('')}</ul>
      </div>

      <div class="io-grid">
        <div class="io-box">
          <h4>它接收什么</h4>
          <ul>${s.inputs.map((i) => `<li>${i}</li>`).join('')}</ul>
        </div>
        <div class="io-box">
          <h4>它输出什么</h4>
          <ul>${s.outputs.map((o) => `<li>${o}</li>`).join('')}</ul>
        </div>
      </div>

      <div class="panel-section">
        <h3>它如何与其他结构协作</h3>
        <p>${s.collaboration}</p>
      </div>

      <div class="panel-section">
        <h3>一个真实任务中的例子</h3>
        <p>${s.example}</p>
      </div>

      <div class="panel-section">
        <h3>常见误解</h3>
        <p>${s.misconception}</p>
      </div>

      <div class="panel-section">
        <h3>失败时会发生什么</h3>
        <p>${s.failureMode}</p>
      </div>

      <div class="panel-section">
        <h3>CEO / 管理者应该知道什么</h3>
        <div class="exec-q">${s.executiveQuestion}</div>
      </div>

      <div class="panel-section">
        <h3>相关概念</h3>
        <div class="related">${s.relatedConcepts.map((c) => `<span class="related-chip">${c}</span>`).join('')}</div>
      </div>

      <div class="panel-section">
        <label class="conn-toggle">
          <input type="checkbox" id="conn-check" ${state.showConnections ? 'checked' : ''} />
          <span>显示连接（上下游结构）</span>
        </label>
      </div>

      <div class="panel-pager">
        <button class="pager-btn" id="pager-prev" ${prev ? '' : 'disabled'}>
          <span class="dir">上一个</span><span class="name">${prev ? prev.nameZh : '—'}</span>
        </button>
        <button class="pager-btn" id="pager-next" ${next ? '' : 'disabled'}>
          <span class="dir">下一个</span><span class="name">${next ? next.nameZh : '—'}</span>
        </button>
      </div>
    `;

    // 显示连接开关
    content.querySelector<HTMLInputElement>('#conn-check')?.addEventListener('change', (e) => {
      unlockAudio();
      if ((e.target as HTMLInputElement).checked !== state.showConnections) store.toggleConnections();
    });

    // 上一个 / 下一个
    content.querySelector('#pager-prev')?.addEventListener('click', () => prev && goTo(prev.id));
    content.querySelector('#pager-next')?.addEventListener('click', () => next && goTo(next.id));
  }

  function goTo(id: string): void {
    unlockAudio();
    store.markExplored(id);
    store.select(id);
    if (store.get().soundOn) playSelect();
    document.getElementById('col-panel')!.scrollTo({ top: 0, behavior: 'auto' });
  }
}
