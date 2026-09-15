import type { System, SystemId } from '../types';

/**
 * 六个 AI 系统分组。
 * 颜色遵循低饱和度、温暖、克制的医学图鉴风格。
 */
export const SYSTEMS: System[] = [
  {
    id: 'perception',
    nameZh: '感知系统',
    nameEn: 'Perception',
    color: '#6e7b6a',
    description: '让 AI 看见、听见、触碰外部世界与用户输入。',
    structureIds: ['eye', 'ear', 'skin'],
  },
  {
    id: 'cognition',
    nameZh: '认知系统',
    nameEn: 'Cognition',
    color: '#8a3b33',
    description: '理解、推理、规划，并决定调用哪个模型。',
    structureIds: ['brain', 'frontal-lobe', 'model-routing'],
  },
  {
    id: 'memory',
    nameZh: '记忆系统',
    nameEn: 'Memory',
    color: '#9a7b4f',
    description: '在当前任务中保持信息，并从知识与历史中检索。',
    structureIds: ['working-memory', 'semantic-memory', 'episodic-memory', 'procedural-memory'],
  },
  {
    id: 'action',
    nameZh: '行动系统',
    nameEn: 'Action',
    color: '#b5763a',
    description: '连接、调用工具、推进任务，并把结果表达出来。',
    structureIds: ['nervous-system', 'hands', 'feet', 'mouth'],
  },
  {
    id: 'runtime',
    nameZh: '运行系统',
    nameEn: 'Runtime',
    color: '#6b5f4f',
    description: '为模型提供算力、数据流转、数据摄取与底层支撑。',
    structureIds: ['heart', 'circulation', 'digestion', 'skeleton'],
  },
  {
    id: 'safety',
    nameZh: '安全与进化系统',
    nameEn: 'Safety & Evolution',
    color: '#a0553f',
    description: '守住权限与隐私，并依据反馈持续校准系统。',
    structureIds: ['immune', 'feedback'],
  },
];

export const SYSTEM_BY_ID: Record<SystemId, System> = Object.fromEntries(
  SYSTEMS.map((s) => [s.id, s]),
) as Record<SystemId, System>;
