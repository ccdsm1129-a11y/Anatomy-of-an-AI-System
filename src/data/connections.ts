import type { Connection } from '../types';

/**
 * 结构间的关系（有向边）。
 * 用于"显示连接"功能：选中某结构时，高亮其上下游并绘制纤细引导线。
 */
export const CONNECTIONS: Connection[] = [
  // 感知 → 认知
  { from: 'eye', to: 'brain', label: '视觉信息' },
  { from: 'ear', to: 'brain', label: '语音文本' },
  { from: 'skin', to: 'brain', label: '用户输入' },

  // 认知内部
  { from: 'brain', to: 'frontal-lobe', label: '转规划' },
  { from: 'brain', to: 'model-routing', label: '选模型' },

  // 记忆 ↔ 认知
  { from: 'brain', to: 'working-memory', label: '写入上下文' },
  { from: 'working-memory', to: 'brain', label: '当前上下文' },
  { from: 'semantic-memory', to: 'brain', label: '注入知识' },
  { from: 'episodic-memory', to: 'brain', label: '历史经验' },
  { from: 'procedural-memory', to: 'frontal-lobe', label: 'SOP 步骤' },
  { from: 'working-memory', to: 'semantic-memory', label: '检索查询' },

  // 认知 → 行动
  { from: 'frontal-lobe', to: 'nervous-system', label: '执行指令' },
  { from: 'nervous-system', to: 'hands', label: '调用工具' },
  { from: 'nervous-system', to: 'feet', label: '推进流程' },
  { from: 'brain', to: 'mouth', label: '组织表达' },

  // 行动 → 运行 / 记忆
  { from: 'hands', to: 'digestion', label: '采集数据' },
  { from: 'digestion', to: 'semantic-memory', label: '写入知识库' },
  { from: 'mouth', to: 'skin', label: '交付结果' },

  // 运行 → 认知
  { from: 'heart', to: 'brain', label: '算力支撑' },
  { from: 'circulation', to: 'brain', label: '数据流转' },

  // 安全
  { from: 'immune', to: 'hands', label: '权限检查' },
  { from: 'immune', to: 'nervous-system', label: '调用审批' },
  { from: 'feedback', to: 'brain', label: '结果回传' },
  { from: 'feedback', to: 'frontal-lobe', label: '修正计划' },
  { from: 'skin', to: 'feedback', label: '用户反馈' },
];

/** 由某结构 id 查其上下游连接 */
export function getConnectionsFor(id: string): Connection[] {
  return CONNECTIONS.filter((c) => c.from === id || c.to === id);
}
