import type { ViewId } from '../types';
import { store } from '../state/store';
import { STRUCTURE_BY_ID } from '../data/structures';
import { getConnectionsFor } from '../data/connections';
import {
  injectSvg,
  applyStyles,
  structureCenters,
  drawConnections,
  clearConnections,
  type Pt,
  type ConnLine,
} from '../svg/anatomogram';
import { playSelect, playHover, unlockAudio } from '../audio/sound';

let svg: SVGSVGElement | null = null;
let currentView: ViewId | null = null;
let tooltip: HTMLElement;
let labelsEl: HTMLElement;
let stage: HTMLElement;

export function initCanvas(): void {
  const host = document.getElementById('svg-host')!;
  stage = document.getElementById('canvas-stage')!;
  const title = document.getElementById('canvas-title')!;
  const sub = document.getElementById('canvas-sub')!;
  const viewHint = document.getElementById('view-hint')!;

  tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  stage.appendChild(tooltip);

  labelsEl = document.createElement('div');
  labelsEl.className = 'labels-layer';
  stage.appendChild(labelsEl);

  // 首次注入
  renderView(store.get().view);

  document.getElementById('reset-view')!.addEventListener('click', () => {
    unlockAudio();
    store.select(null);
  });

  store.subscribe(applyAll);
  applyAll();
}

function renderView(view: ViewId): void {
  const host = document.getElementById('svg-host')!;
  svg = injectSvg(host, view);
  currentView = view;
  wireSvgEvents();
}

function wireSvgEvents(): void {
  if (!svg) return;
  svg.addEventListener('mouseover', onMouseOver);
  svg.addEventListener('mouseout', onMouseOut);
  svg.addEventListener('mousemove', onMouseMove);
  svg.addEventListener('click', onClick);
  svg.addEventListener('keydown', onKeydown);
}

function structFromTarget(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest('[data-structure]');
  return el ? el.getAttribute('data-structure') : null;
}

function onMouseOver(e: MouseEvent): void {
  const id = structFromTarget(e.target);
  if (!id) return;
  store.hover(id);
  if (store.get().soundOn) playHover();
  const s = STRUCTURE_BY_ID[id];
  tooltip.innerHTML = `${s.nameZh}<span class="en">${s.nameEn}</span>`;
  positionTooltip(e.clientX, e.clientY);
  tooltip.classList.add('is-visible');
}

function onMouseMove(e: MouseEvent): void {
  if (tooltip.classList.contains('is-visible')) positionTooltip(e.clientX, e.clientY);
}

function onMouseOut(): void {
  store.hover(null);
  tooltip.classList.remove('is-visible');
}

function onClick(e: MouseEvent): void {
  const id = structFromTarget(e.target);
  if (!id) return;
  selectStructure(id);
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const id = structFromTarget(e.target);
  if (!id) return;
  e.preventDefault();
  selectStructure(id);
}

function selectStructure(id: string): void {
  unlockAudio();
  store.markExplored(id);
  store.select(id);
  if (store.get().soundOn) playSelect();
}

function positionTooltip(clientX: number, clientY: number): void {
  const r = stage.getBoundingClientRect();
  tooltip.style.left = `${clientX - r.left + 14}px`;
  tooltip.style.top = `${clientY - r.top + 14}px`;
}

/** 选中结构在当前视图是否可见 */
function isVisibleInView(id: string, view: ViewId): boolean {
  const s = STRUCTURE_BY_ID[id];
  if (!s) return false;
  return view === 'full' ? s.bodyRegionIds.length > 0 : (s.brainRegionIds?.length || 0) > 0;
}

/** 连接模式下的邻接结构集合 */
function connectionIdSet(): Set<string> {
  const state = store.get();
  const set = new Set<string>();
  if (state.showConnections && state.selectedId) {
    for (const c of getConnectionsFor(state.selectedId)) {
      set.add(c.from);
      set.add(c.to);
    }
  }
  return set;
}

/** viewBox 坐标 → stage 相对像素 */
function viewBoxToStage(pt: Pt): { left: number; top: number } {
  const ctm = svg!.getScreenCTM();
  const p = new DOMPoint(pt.x, pt.y).matrixTransform(ctm!);
  const r = stage.getBoundingClientRect();
  return { left: p.x - r.left, top: p.y - r.top };
}

function renderLabels(): void {
  labelsEl.innerHTML = '';
  const state = store.get();
  if (!state.selectedId || !svg) return;
  const centers = structureCenters(svg, state.selectedId, state.view);
  const c = centers[0];
  if (!c) return;
  const s = STRUCTURE_BY_ID[state.selectedId];
  const pos = viewBoxToStage(c);
  const label = document.createElement('div');
  label.className = 'svg-label is-visible';
  label.textContent = s.nameZh;
  label.style.left = `${pos.left}px`;
  label.style.top = `${pos.top}px`;
  label.style.transform = 'translate(-50%, -130%)';
  labelsEl.appendChild(label);
}

function renderConnections(): void {
  if (!svg) return;
  const state = store.get();
  if (!state.showConnections || !state.selectedId) {
    clearConnections(svg);
    return;
  }
  const selCenters = structureCenters(svg, state.selectedId, state.view);
  const selCenter = selCenters[0];
  if (!selCenter) {
    clearConnections(svg);
    return;
  }
  const lines: ConnLine[] = [];
  for (const c of getConnectionsFor(state.selectedId)) {
    const neighbor = c.from === state.selectedId ? c.to : c.from;
    const nCenters = structureCenters(svg, neighbor, state.view);
    if (!nCenters.length) continue;
    const n = nCenters[0];
    lines.push({ x1: selCenter.x, y1: selCenter.y, x2: n.x, y2: n.y, label: c.label });
  }
  drawConnections(svg, lines);
}

function applyAll(): void {
  const state = store.get();

  if (state.view !== currentView) {
    renderView(state.view);
  }

  title: {
    const t = document.getElementById('canvas-title')!;
    t.textContent = state.view === 'full' ? '完整系统' : '大脑特写';
  }
  sub: {
    const s = document.getElementById('canvas-sub')!;
    if (state.selectedId && STRUCTURE_BY_ID[state.selectedId]) {
      s.textContent = STRUCTURE_BY_ID[state.selectedId].shortDescription;
    } else {
      s.textContent =
        state.view === 'full'
          ? '探索一个人工智能生命体的各个组成部分'
          : '放大大脑，观察认知、记忆与感知的细节';
    }
  }

  if (svg) {
    applyStyles(svg, {
      view: state.view,
      selectedId: state.selectedId,
      hoveredId: state.hoveredId,
      connectionIds: connectionIdSet(),
      demoIds: new Set(state.demoActiveIds),
    });
  }

  renderConnections();
  renderLabels();

  // 视图提示
  const hint = document.getElementById('view-hint')!;
  if (state.selectedId && !isVisibleInView(state.selectedId, state.view)) {
    hint.hidden = false;
    hint.textContent = state.view === 'full' ? '该结构在大脑特写视图中' : '该结构在完整系统视图中';
  } else {
    hint.hidden = true;
  }
}
