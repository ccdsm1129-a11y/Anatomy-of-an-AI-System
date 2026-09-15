import type { DemoTask } from '../types';

/**
 * 任务演示：完整实现第一个任务。
 * 其余任务入口为"即将开放"，不提供假按钮。
 */
export const DEMO_TASKS: DemoTask[] = [
  {
    id: 'ceo-brief',
    title: '研究一家潜在客户，生成 CEO 拜访简报',
    subtitle: '端到端任务演示',
    summary:
      '完成这项任务，一共动用了 11 个系统。LLM（大脑）只是其中之一——真正让任务跑起来的是感知、记忆、行动、运行与安全系统的协同。',
    steps: [
      {
        title: '眼睛：读取客户网站与公开材料',
        structureIds: ['eye', 'hands', 'circulation'],
        input: '客户公司名、官网 URL、公开资料',
        process: '打开官网与公开页面，抓取并识别文字、图片与图表',
        output: '结构化的客户概况（业务、规模、新闻）',
        narration:
          'AI 首先"看"这家潜在客户——访问其官网、新闻稿和公开报告，把零散的网页内容抓取下来，为后续研究准备原料。',
      },
      {
        title: '耳朵：转录历史会议',
        structureIds: ['ear'],
        input: '过往与客户相关的会议录音',
        process: '语音转文字、识别说话人、切分议题',
        output: '带说话人的会议纪要文本',
        narration:
          '接着，AI 把过去和这家客户相关的会议录音转成文字，捕捉当时谈过什么、对方关心什么。',
      },
      {
        title: '记忆系统：检索 CRM 与历史沟通',
        structureIds: ['semantic-memory', 'episodic-memory', 'working-memory'],
        input: '客户名、时间范围',
        process: '从知识库与历史记录中检索过往沟通、联系人、偏好',
        output: '该客户的历史画像与沟通要点',
        narration:
          'AI 从记忆里翻出和这家客户的所有历史——过往邮件、拜访记录、对方关注的话题，形成一份"我们和 TA 的关系画像"。',
      },
      {
        title: '大脑：理解任务目标',
        structureIds: ['brain', 'working-memory'],
        input: '任务指令 + 已收集的材料',
        process: '理解"要拜访的 CEO 关心什么、我们想达成什么"',
        output: '清晰的任务目标与约束',
        narration:
          '现在，大脑把任务目标理清楚：这不是写一篇泛泛的介绍，而是一份帮 CEO 拜访时"有备而来"的简报。',
      },
      {
        title: '额叶：制定研究计划',
        structureIds: ['frontal-lobe'],
        input: '任务目标与现有材料缺口',
        process: '拆解步骤、判断还缺什么、安排执行顺序',
        output: '一份研究计划（还缺哪些信息）',
        narration:
          '额叶把目标拆成步骤，并发现材料有缺口——比如还缺对方最近的融资动态，于是决定先去补充搜索。',
      },
      {
        title: '神经系统：连接搜索、CRM 与知识库',
        structureIds: ['nervous-system', 'model-routing'],
        input: '执行计划 + 各系统接口',
        process: '调度搜索工具、CRM 接口与知识库，路由到合适模型',
        output: '打通的数据通路',
        narration:
          '神经系统把计划变成真实的调用——连接搜索引擎、CRM 和内部知识库，并把不同任务路由给合适的模型处理。',
      },
      {
        title: '双手：执行搜索、读取与整理',
        structureIds: ['hands', 'heart'],
        input: '搜索关键词、待读取的页面与文档',
        process: '执行搜索、读取文件、整理出要点（算力持续支撑）',
        output: '整理好的研究素材',
        narration:
          '双手真正"动手"了：执行搜索、读取页面和文档，把有用信息一条条整理出来。心脏则在背后持续提供算力。',
      },
      {
        title: '消化系统：清洗与结构化信息',
        structureIds: ['digestion'],
        input: '五花八门的原始素材',
        process: '解析、清洗、去重、结构化、建立索引',
        output: '干净、可检索的结构化信息',
        narration:
          '采来的原始材料参差不齐，消化系统把它们清洗、去重、结构化，去掉噪音，留下可用的"养分"。',
      },
      {
        title: '免疫系统：检查权限与敏感数据',
        structureIds: ['immune'],
        input: '即将写入简报的全部信息',
        process: '校验数据权限、标记敏感信息、拦截越权内容',
        output: '通过安全检查的内容',
        narration:
          '在写入简报前，免疫系统设了一道关：这些数据我能用吗？有没有敏感信息？权限是否合规？',
      },
      {
        title: '嘴巴：生成拜访简报',
        structureIds: ['mouth', 'skin'],
        input: '结构化信息 + 任务目标',
        process: '组织语言、生成面向 CEO 的拜访简报',
        output: '一份可交付的拜访简报',
        narration:
          '所有信息就位后，嘴巴把它们组织成一份条理清晰、CEO 能直接用的拜访简报，并通过界面交付出来。',
      },
      {
        title: '反馈系统：检查完整性与事实依据',
        structureIds: ['feedback'],
        input: '生成的简报草稿',
        process: '核对关键事实、检查完整性、评估质量',
        output: '经过校验的最终简报',
        narration:
          '最后，反馈系统做一道质检：关键数字有没有出处？结论有没有依据？不完整的地方补上，才算真正完成。',
      },
    ],
  },
];

export const UPCOMING_TASKS: { id: string; title: string; hint: string }[] = [
  { id: 'financial-report', title: '分析一份财务报告', hint: '即将开放' },
  { id: 'presentation', title: '制作一份演示文稿', hint: '即将开放' },
  { id: 'lead-handling', title: '自动处理客户线索', hint: '即将开放' },
  { id: 'meeting-followup', title: '总结会议并创建后续任务', hint: '即将开放' },
];
