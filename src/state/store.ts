import type { ViewId } from '../types';
import { loadExplored, saveExplored, loadSound, saveSound, loadView, saveView } from '../persistence/storage';

export interface AppState {
  view: ViewId;
  selectedId: string | null;
  hoveredId: string | null;
  showConnections: boolean;
  soundOn: boolean;
  explored: Set<string>;
  demoRunning: boolean;
  demoActiveIds: string[];
}

type Listener = (state: AppState) => void;

class Store {
  private state: AppState;
  private listeners = new Set<Listener>();

  constructor() {
    this.state = {
      view: loadView(),
      selectedId: null,
      hoveredId: null,
      showConnections: false,
      soundOn: loadSound(),
      explored: loadExplored(),
      demoRunning: false,
      demoActiveIds: [],
    };
  }

  get(): AppState {
    return this.state;
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private commit(patch: Partial<AppState>): void {
    this.state = { ...this.state, ...patch };
    for (const fn of this.listeners) fn(this.state);
  }

  select(id: string | null): void {
    this.commit({ selectedId: id });
  }

  hover(id: string | null): void {
    if (this.state.hoveredId === id) return;
    this.commit({ hoveredId: id });
  }

  setView(view: ViewId): void {
    if (this.state.view === view) return;
    saveView(view);
    this.commit({ view });
  }

  toggleConnections(): void {
    this.commit({ showConnections: !this.state.showConnections });
  }

  markExplored(id: string): void {
    if (this.state.explored.has(id)) return;
    const next = new Set(this.state.explored);
    next.add(id);
    saveExplored(next);
    this.commit({ explored: next });
  }

  resetExplored(): void {
    const next = new Set<string>();
    saveExplored(next);
    this.commit({ explored: next });
  }

  toggleSound(): void {
    const next = !this.state.soundOn;
    saveSound(next);
    this.commit({ soundOn: next });
  }

  setDemoRunning(running: boolean): void {
    this.commit({ demoRunning: running });
  }

  setDemoActive(ids: string[]): void {
    this.commit({ demoActiveIds: ids });
  }
}

export const store = new Store();
