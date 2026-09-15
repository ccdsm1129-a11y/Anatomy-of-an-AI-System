import type { Structure, ViewId } from '../types';
import { STRUCTURE_BY_ID, STRUCTURES } from '../data/structures';
import { SYSTEM_BY_ID } from '../data/systems';
import { SVG_RAW } from './svgRaw';

/* ============ 颜色常量（与设计令牌一致的 hex，供 SVG 属性直接使用） ============ */
const DEFAULT_FILL = '#e9e0cf';
const DEFAULT_STROKE = '#bdb29c';
const OUTLINE_FILL = '#c2b7a4';
const SELECTED_STROKE = '#241a12';
const DIM_OPACITY = 0.26;

const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

const SHAPE_TAGS = new Set(['path', 'ellipse', 'rect', 'circle', 'polygon', 'polyline', 'line', 'g']);

/* ============ 基础工具 ============ */

function findLayer(svg: SVGSVGElement, id: string): SVGGElement | null {
  const groups = svg.getElementsByTagNameNS(SVG_NS, 'g');
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].getAttribute('id') === id) return groups[i] as SVGGElement;
  }
  return null;
}

export function getElementById(svg: SVGSVGElement, id: string): Element | null {
  return svg.querySelector(`[id="${CSS.escape(id)}"]`);
}

/** 解析 <use> 到其引用的基础形状 */
function resolveUse(el: Element): Element {
  if (el.tagName.toLowerCase() !== 'use') return el;
  const href = el.getAttribute('xlink:href') || el.getAttribute('href') || el.getAttributeNS(XLINK_NS, 'href');
  if (href && href.startsWith('#')) {
    const owner = el.ownerDocument;
    const target = owner?.getElementById(href.slice(1));
    if (target) return target;
  }
  return el;
}

/** 递归设置 fill/stroke（stroke 不继承，须逐级设置到后代形状） */
function applyStyle(el: Element, style: { fill?: string; stroke?: string; strokeWidth?: number; opacity?: number }): void {
  const tag = el.tagName.toLowerCase();
  if (tag === 'title' || tag === 'desc' || tag === 'use') return;
  const se = el as SVGElement;
  if (SHAPE_TAGS.has(tag)) {
    if (style.fill !== undefined) se.style.fill = style.fill;
    if (style.stroke !== undefined) se.style.stroke = style.stroke;
    if (style.strokeWidth !== undefined) se.style.strokeWidth = String(style.strokeWidth);
    if (style.opacity !== undefined) se.style.opacity = String(style.opacity);
  }
  for (let i = 0; i < el.children.length; i++) {
    applyStyle(el.children[i], style);
  }
}

/** 十六进制颜色混合（用于浅色 tint，factor 0-1 表示接近白色的程度） */
function tint(hex: string, factor: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const m = (c: number) => Math.round(c + (255 - c) * factor);
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
}

function structureColor(id: string): string {
  const s = STRUCTURE_BY_ID[id];
  return s ? SYSTEM_BY_ID[s.system].color : DEFAULT_FILL;
}

/* ============ 反向映射：UBERON id → 结构 id[]（按视图） ============ */

function buildReverseMap(view: ViewId): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const s of STRUCTURES) {
    const ids = view === 'full' ? s.bodyRegionIds : s.brainRegionIds || [];
    for (const id of ids) {
      const arr = map.get(id) || [];
      arr.push(s.id);
      map.set(id, arr);
    }
  }
  return map;
}

/** 全局 id → 结构（用于 aria-label，取第一个拥有者） */
function buildLabelMap(): Map<string, Structure> {
  const map = new Map<string, Structure>();
  for (const s of STRUCTURES) {
    for (const id of s.bodyRegionIds) if (!map.has(id)) map.set(id, s);
    for (const id of s.brainRegionIds || []) if (!map.has(id)) map.set(id, s);
  }
  return map;
}

/* ============ SVG 注入与初始化 ============ */

function stripXmlProlog(src: string): string {
  return src
    .replace(/^\uFEFF/, '')
    .replace(/<\?xml[^>]*\?>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
}

/** 注入 SVG 到宿主容器，返回 SVG 根元素 */
export function injectSvg(host: HTMLElement, view: ViewId): SVGSVGElement {
  host.innerHTML = stripXmlProlog(SVG_RAW[view]);
  const svg = host.querySelector('svg');
  if (!svg) throw new Error('SVG 注入失败：未找到 <svg> 元素');
  initSvg(svg as SVGSVGElement, view);
  return svg as SVGSVGElement;
}

/** 初始化：清理 visibility:hidden → 应用默认 fill/stroke → 重着色轮廓 → 标记可交互结构 */
function initSvg(svg: SVGSVGElement, view: ViewId): void {
  // 1. 防御性清理 visibility:hidden（元素及其父级）
  const all = svg.querySelectorAll<Element>('*');
  all.forEach((el) => {
    const se = el as SVGElement;
    if (se.getAttribute('visibility') === 'hidden' || se.style.visibility === 'hidden') {
      se.removeAttribute('visibility');
      se.style.visibility = '';
    }
  });

  // 2. 轮廓层重着色为暖中性
  const outline = findLayer(svg, 'LAYER_OUTLINE');
  if (outline) applyStyle(outline, { fill: OUTLINE_FILL });

  // 3. 默认 fill/stroke 应用到所有 EFO 结构（在任何高亮逻辑之前）
  const efo = findLayer(svg, 'LAYER_EFO');
  if (efo) {
    for (let i = 0; i < efo.children.length; i++) {
      const child = efo.children[i];
      if (child.tagName.toLowerCase() === 'use') continue; // 被动渲染，样式跟随目标
      applyStyle(child, { fill: DEFAULT_FILL, stroke: DEFAULT_STROKE, strokeWidth: 0.5, opacity: 1 });
    }
  }

  // 4. 标记可交互结构（role / tabindex / aria-label / 指针光标）
  const labelMap = buildLabelMap();
  const interactiveIds = new Set(labelMap.keys());
  if (efo) {
    for (let i = 0; i < efo.children.length; i++) {
      const child = efo.children[i];
      const id = child.getAttribute('id');
      if (!id || !interactiveIds.has(id)) continue;
      if (child.tagName.toLowerCase() === 'use') continue;
      const target = resolveUse(child) as SVGElement;
      const st = labelMap.get(id)!;
      target.setAttribute('role', 'button');
      target.setAttribute('tabindex', '0');
      target.setAttribute('aria-label', `${st.nameZh}（${st.nameEn}）：${st.shortDescription}`);
      target.setAttribute('data-structure', st.id);
      target.classList.add('organ-shape');
    }
  }
}

/* ============ 高亮 / 悬停 / 淡化 ============ */

export interface StyleContext {
  view: ViewId;
  selectedId: string | null;
  hoveredId: string | null;
  /** 连接模式下的附加高亮结构集合（不含 selected） */
  connectionIds: Set<string>;
  /** 任务演示模式下的激活结构集合 */
  demoIds: Set<string>;
}

export function applyStyles(svg: SVGSVGElement, ctx: StyleContext): void {
  const efo = findLayer(svg, 'LAYER_EFO');
  if (!efo) return;
  const reverse = buildReverseMap(ctx.view);
  const selectedColor = ctx.selectedId ? structureColor(ctx.selectedId) : null;
  const hoverColor = ctx.hoveredId ? structureColor(ctx.hoveredId) : null;
  const demoActive = ctx.demoIds.size > 0;

  for (let i = 0; i < efo.children.length; i++) {
    const child = efo.children[i];
    if (child.tagName.toLowerCase() === 'use') continue;
    const id = child.getAttribute('id');
    const owners = id ? reverse.get(id) || [] : [];

    const isSelected = !!ctx.selectedId && owners.includes(ctx.selectedId);
    const demoOwner = owners.find((o) => ctx.demoIds.has(o));
    const isDemo = !isSelected && !!demoOwner;
    const isHovered = !isSelected && !isDemo && !!ctx.hoveredId && owners.includes(ctx.hoveredId);
    const connOwner = owners.find((o) => ctx.connectionIds.has(o));
    const isConn = !isSelected && !isDemo && !isHovered && !!connOwner;

    let style: { fill?: string; stroke?: string; strokeWidth?: number; opacity?: number };
    if (isSelected && selectedColor) {
      style = { fill: selectedColor, stroke: SELECTED_STROKE, strokeWidth: 1, opacity: 1 };
    } else if (isDemo) {
      const c = structureColor(demoOwner!);
      style = { fill: c, stroke: SELECTED_STROKE, strokeWidth: 1, opacity: 0.92 };
    } else if (isHovered && hoverColor) {
      style = { fill: tint(hoverColor, 0.62), stroke: hoverColor, strokeWidth: 0.6, opacity: 1 };
    } else if (isConn) {
      const c = structureColor(connOwner!);
      style = { fill: tint(c, 0.78), stroke: c, strokeWidth: 0.7, opacity: 0.9 };
    } else if (ctx.selectedId || demoActive) {
      style = { fill: DEFAULT_FILL, stroke: DEFAULT_STROKE, strokeWidth: 0.5, opacity: DIM_OPACITY };
    } else {
      style = { fill: DEFAULT_FILL, stroke: DEFAULT_STROKE, strokeWidth: 0.5, opacity: 1 };
    }
    applyStyle(child, style);
  }
}

/* ============ 几何定位（transform 感知，映射到 viewBox 坐标） ============ */

export interface Pt {
  x: number;
  y: number;
}

/** 屏幕坐标 → 主 SVG 的 viewBox 坐标（用 getScreenCTM 逆矩阵，正确处理 transform 与 letterbox） */
function toViewBox(svg: SVGSVGElement, screenX: number, screenY: number): Pt | null {
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const p = new DOMPoint(screenX, screenY).matrixTransform(ctm.inverse());
  return { x: p.x, y: p.y };
}

/** 结构在当前视图下的区域中心（viewBox 坐标），去重（use 解析到基础形状） */
export function structureCenters(svg: SVGSVGElement, structureId: string, view: ViewId): Pt[] {
  const s = STRUCTURE_BY_ID[structureId];
  if (!s) return [];
  const ids = view === 'full' ? s.bodyRegionIds : s.brainRegionIds || [];
  const seen = new Set<Element>();
  const pts: Pt[] = [];
  for (const id of ids) {
    const raw = getElementById(svg, id);
    if (!raw) continue;
    const target = resolveUse(raw);
    if (seen.has(target)) continue;
    seen.add(target);
    const r = target.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const p = toViewBox(svg, r.left + r.width / 2, r.top + r.height / 2);
    if (p) pts.push(p);
  }
  return pts;
}

/* ============ 关系引导线（医学图谱风格，注入 SVG 内部覆盖层） ============ */

const OVERLAY_ID = 'anatomy-overlay';

export function clearConnections(svg: SVGSVGElement): void {
  const existing = getElementById(svg, OVERLAY_ID);
  if (existing) existing.remove();
}

export interface ConnLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
}

export function drawConnections(svg: SVGSVGElement, lines: ConnLine[]): void {
  clearConnections(svg);
  if (!lines.length) return;

  const g = document.createElementNS(SVG_NS, 'g');
  g.setAttribute('id', OVERLAY_ID);

  for (const line of lines) {
    const path = document.createElementNS(SVG_NS, 'path');
    // 轻柔的弧线（像医学图鉴的引导线）
    const mx = (line.x1 + line.x2) / 2;
    const bend = Math.min(Math.abs(line.x2 - line.x1) * 0.12, 14);
    const d = `M ${line.x1} ${line.y1} Q ${mx} ${line.y1 - bend} ${line.x2} ${line.y2}`;
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#5c5548');
    path.setAttribute('stroke-width', '0.8');
    path.setAttribute('stroke-dasharray', '2.5 3');
    path.setAttribute('opacity', '0.55');
    g.appendChild(path);

    // 起点与终点小圆点
    for (const [cx, cy] of [
      [line.x1, line.y1],
      [line.x2, line.y2],
    ]) {
      const dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('cx', String(cx));
      dot.setAttribute('cy', String(cy));
      dot.setAttribute('r', '1.2');
      dot.setAttribute('fill', '#5c5548');
      dot.setAttribute('opacity', '0.7');
      g.appendChild(dot);
    }

    if (line.label) {
      const text = document.createElementNS(SVG_NS, 'text');
      text.setAttribute('x', String(mx));
      text.setAttribute('y', String(Math.min(line.y1, line.y2) - bend - 2));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '7');
      text.setAttribute('font-family', 'var(--font-mono)');
      text.setAttribute('fill', '#6b6157');
      text.textContent = line.label;
      g.appendChild(text);
    }
  }

  svg.appendChild(g);
}
