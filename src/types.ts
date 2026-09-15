export type SystemId = 'perception' | 'cognition' | 'memory' | 'action' | 'runtime' | 'safety';

export type ViewId = 'full' | 'brain';

export interface System {
  id: SystemId;
  nameZh: string;
  nameEn: string;
  color: string;
  description: string;
  structureIds: string[];
}

export interface Structure {
  id: string;
  nameZh: string;
  nameEn: string;
  enTerm: string;
  system: SystemId;
  shortDescription: string;
  /** male.svg（完整系统）中真实存在的 UBERON/CL ID */
  bodyRegionIds: string[];
  /** brain.svg（大脑特写）中真实存在的 UBERON ID，缺省表示该结构不在脑特写图中 */
  brainRegionIds?: string[];
  /** "最近区域"映射的理由说明 */
  mappingNote?: string;
  definition: string;
  inputs: string[];
  processes: string[];
  outputs: string[];
  collaboration: string;
  example: string;
  misconception: string;
  failureMode: string;
  executiveQuestion: string;
  relatedConcepts: string[];
}

export interface Connection {
  from: string;
  to: string;
  label: string;
}

export interface DemoStep {
  title: string;
  structureIds: string[];
  input: string;
  process: string;
  output: string;
  narration: string;
}

export interface DemoTask {
  id: string;
  title: string;
  subtitle: string;
  steps: DemoStep[];
  summary: string;
}
