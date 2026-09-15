import type { Structure } from '../types';

/**
 * 20 个 AI 结构 → 人体解剖映射。
 *
 * 重要：bodyRegionIds / brainRegionIds 全部是 SVG 文件中真实存在的
 * UBERON / CL ID（已通过解析包内 SVG 文件逐一核实）。
 * 带 mappingNote 的条目是"最近真实区域"组合映射，未伪造任何器官。
 *
 * 男性全身图 (homo_sapiens.male.svg) viewBox 0 0 106 195
 * 大脑特写 (homo_sapiens.brain.svg) viewBox 0 0 143.5 121.7
 */
export const STRUCTURES: Structure[] = [
  // ===================== 认知系统 =====================
  {
    id: 'brain',
    nameZh: '大脑',
    nameEn: 'Brain',
    enTerm: 'LLM · Foundation Model',
    system: 'cognition',
    shortDescription: 'AI 的语言理解、知识压缩、模式识别与内容生成中心。',
    bodyRegionIds: ['UBERON_0000955', 'UBERON_0000956'],
    brainRegionIds: ['UBERON_0000956', 'UBERON_0001870', 'UBERON_0001871', 'UBERON_0001872', 'UBERON_0002021'],
    definition:
      '大语言模型（LLM）是在海量文本上训练出的基础模型，能理解、生成语言，也表现出一定的推理能力。它把人类知识压缩进数十亿参数里，是 AI 系统的认知中枢——但它本身只是"大脑"，不等于完整的 AI 应用。',
    inputs: ['自然语言文本（Prompt）', '上下文与历史对话', '来自记忆系统的检索结果'],
    processes: ['语言理解与语义建模', '模式识别与知识调用', '生成回复 / 续写 / 摘要', '遵循指令完成任务'],
    outputs: ['生成的文本与推理结论', '对下一步行动的判断', '结构化或半结构化的内容'],
    collaboration:
      '大脑接收眼睛、耳朵传入的信息，把任务目标交给额叶规划，从记忆系统调用知识，再经由神经系统把指令下发给双手和双脚去执行。',
    example:
      '当你说"帮我总结这份合同的风险点"，大脑负责理解这句话的意图、识别合同中的关键条款，并组织出一段条理清晰的风险摘要——但真正读取文件、核对条款的是工具和记忆系统。',
    misconception:
      '很多人以为有了大模型就等于有了 AI 产品。实际上模型只是大脑，还需要感知、记忆、工具、权限和反馈，才能完成一件真实的工作。',
    failureMode:
      '模型"一本正经地胡说八道"（幻觉）：面对不确定或超出知识范围的问题，它仍可能编造看似合理的答案。',
    executiveQuestion:
      '我们的 AI 用的是什么模型？它在哪些环节需要外部知识或工具来补足，而不是只靠模型自己的记忆？',
    relatedConcepts: [
      'Transformer',
      '参数 (Parameters)',
      '训练 vs 推理',
      '上下文窗口',
      '幻觉 (Hallucination)',
    ],
  },
  {
    id: 'frontal-lobe',
    nameZh: '额叶',
    nameEn: 'Frontal lobe',
    enTerm: 'Reasoning · Planning',
    system: 'cognition',
    shortDescription: '把模糊目标拆解成步骤，判断下一步该做什么。',
    bodyRegionIds: ['UBERON_0001870', 'UBERON_0000451'],
    brainRegionIds: ['UBERON_0000451', 'UBERON_0001870', 'UBERON_0002702'],
    definition:
      '额叶对应 AI 的推理、规划与任务分解能力。当目标模糊时，它负责把目标拆成可执行的步骤、安排顺序、在执行中反思并修正方向。多步骤任务的难度，正在于每一步都要根据前一步的结果动态调整。',
    inputs: ['任务目标与约束', '当前进展与中间结果', '可用工具与资源的清单'],
    processes: ['推理 (Reasoning)', '规划 (Planning)', '任务分解 (Task decomposition)', '反思与修正 (Reflection)'],
    outputs: ['可执行的步骤计划', '对"下一步做什么"的判断', '对中间结果的评估与纠偏'],
    collaboration:
      '额叶接收大脑对任务的理解，制定计划后交给神经系统调度；执行过程中不断接收反馈，回到大脑或更新计划。',
    example:
      '生成 CEO 拜访简报时，额叶把任务拆成"搜集客户资料 → 检索历史沟通 → 提炼要点 → 撰写简报"，并在资料不足时决定先补搜索。',
    misconception:
      '以为模型的推理能力是"凭空涌现"的。实际上可靠的推理往往依赖结构化的提示、外部工具和逐步验证，单靠一次回答很容易出错。',
    failureMode: '遇到需要多步推理的问题时，模型可能在中间步骤出错却不自知，把错误一路带到最终结论。',
    executiveQuestion:
      '我们的 AI 在面对多步骤任务时，是靠什么机制保证中间步骤不出错？有没有人工检查点？',
    relatedConcepts: ['Chain-of-thought', 'ReAct', 'Planning', 'Reflection', 'Agent loop'],
  },
  {
    id: 'model-routing',
    nameZh: '模型路由',
    nameEn: 'Model routing',
    enTerm: 'Model routing',
    system: 'cognition',
    shortDescription: '根据任务类型与成本，把请求分派给最合适的模型。',
    bodyRegionIds: ['UBERON_0000955'],
    brainRegionIds: ['UBERON_0001897', 'UBERON_0001894'],
    definition:
      '模型路由像大脑的丘脑——一个信息中继站。它判断一个请求该交给大模型还是小模型、通用模型还是专用模型，在成本、速度与质量之间做权衡。不是所有任务都需要最强的模型。',
    inputs: ['任务类型与复杂度', '成本 / 延迟预算', '各模型的能力与价格'],
    processes: ['意图分类', '模型选择与路由', '降级与重试策略', '结果质量评估'],
    outputs: ['被选中的模型与调用结果', '成本 / 延迟的统计', '路由决策日志'],
    collaboration:
      '模型路由位于认知系统的入口，接收感知层传来的任务，决定由哪个"大脑"来处理，再把结果送回执行层。',
    example:
      '一句简单的"把这段话翻译成英文"交给轻量模型即可，而一份需要深度分析的合同交给更强的模型——路由让便宜的活不用贵的模型。',
    misconception:
      '以为模型越大越好、越贵越强。实际上很多简单任务用大模型是浪费，路由的价值正在于"合适的模型做合适的事"。',
    failureMode: '路由判断失误，把需要精确推理的任务交给能力不足的小模型，导致答案质量不达标。',
    executiveQuestion: '我们有没有按任务难度区分模型？简单任务和复杂任务是否用了不同的成本方案？',
    relatedConcepts: ['Model routing', 'Cascade', 'Small vs Large model', 'Cost optimization'],
  },

  // ===================== 感知系统 =====================
  {
    id: 'eye',
    nameZh: '眼睛',
    nameEn: 'Eye',
    enTerm: 'Vision · OCR · Multimodal',
    system: 'perception',
    shortDescription: '让 AI 读取图片、图表、页面、视频和现实环境。',
    bodyRegionIds: ['UBERON_0000970', 'UBERON_0000966'],
    brainRegionIds: ['UBERON_0002021'],
    definition:
      '眼睛对应 AI 的视觉与多模态理解：图像识别、文字识别（OCR）、图表解析、屏幕与界面理解。它让 AI 不仅能读文字，还能"看"文档扫描件、仪表盘截图甚至视频画面。但"看见"不等于真正理解。',
    inputs: ['图片 / 截图 / 扫描件', '图表与数据可视化', '视频帧与屏幕画面'],
    processes: ['图像理解', 'OCR 文字识别', '图表结构解析', '屏幕 / 界面理解'],
    outputs: ['结构化的视觉信息', '提取出的文字与数字', '对画面内容的描述'],
    collaboration:
      '眼睛把视觉信息送入大脑；视觉皮层（枕叶）对画面做初步加工，再由额叶判断这些信息对当前任务意味着什么。',
    example: 'AI 读取一张财务报表的扫描图，识别出表格结构、提取关键数字，而不需要你手动输入。',
    misconception:
      '以为模型"看到"图片就等于理解了内容。实际上它可能读对文字却误判语义，比如把柱状图的趋势理解反。',
    failureMode: 'OCR 在低清扫描件或复杂表格上识别错误，一个数字的偏差就可能导致整份分析作废。',
    executiveQuestion:
      '我们的 AI 处理的是结构化数据，还是也要处理扫描件、截图这类非结构化视觉信息？出错时如何校验？',
    relatedConcepts: ['OCR', 'Vision-language model', 'Multimodal', 'Document AI', 'Chart understanding'],
  },
  {
    id: 'ear',
    nameZh: '耳朵',
    nameEn: 'Ear',
    enTerm: 'ASR · Speech recognition',
    system: 'perception',
    shortDescription: '让 AI 接收语音、会议、电话和环境声音。',
    bodyRegionIds: ['UBERON_0001871'],
    brainRegionIds: ['UBERON_0001871', 'UBERON_0002771'],
    mappingNote:
      '全身图中没有独立的"耳朵"元素，故映射到颞叶（UBERON_0001871，听觉皮层的所在脑区），这是"听觉处理"最接近的真实解剖区域。',
    definition:
      '耳朵对应语音识别与音频理解：把语音转成文字（ASR）、识别说话人、转录会议、接收实时语音输入。它是 AI 进入会议、客服、语音助手等真实场景的入口。噪声、口音和专业术语是最大的难点。',
    inputs: ['语音 / 录音', '会议音频', '实时麦克风输入', '环境声音'],
    processes: ['自动语音识别 (ASR)', '说话人分离与识别', '会议转录与分段', '实时流式转写'],
    outputs: ['转写文本', '带说话人标注的会议记录', '语音中的关键信息'],
    collaboration:
      '耳朵把转写好的文本交给大脑理解，写入情景记忆作为历史记录，再交由额叶判断哪些是行动项。',
    example: '一场客户会议后，AI 自动转写出完整纪要，并标出每位发言人的观点和下一步行动。',
    misconception:
      '以为语音识别已经"解决"了。实际上嘈杂环境、口音、多人抢话、行业黑话仍会让转写准确率大幅下降。',
    failureMode: '专业术语或英文缩写被转写错（如把 API 写成 apy），导致后续总结基于错误文本。',
    executiveQuestion: '我们的语音场景里，噪声、口音和专业术语多不多？转写错误会造成什么业务后果？',
    relatedConcepts: ['ASR', 'Speaker diarization', 'Streaming transcription', 'Meeting summary'],
  },
  {
    id: 'skin',
    nameZh: '皮肤',
    nameEn: 'Skin',
    enTerm: 'UI · UX · Interface',
    system: 'perception',
    shortDescription: '用户与 AI 系统接触的边界。',
    bodyRegionIds: ['UBERON_0000014'],
    brainRegionIds: ['UBERON_0002360'],
    definition:
      '皮肤对应 AI 的产品界面与用户体验：聊天界面、表单、侧边栏、工作台、嵌入式助手。它是用户与系统的接触面，决定信任感如何形成。聊天界面不是 AI 产品的唯一形态。',
    inputs: ['用户的操作与输入', '系统的处理结果', '用户偏好与使用场景'],
    processes: ['界面与交互设计', '可解释的反馈呈现', '用户确认与错误恢复'],
    outputs: ['用户可见的界面', '清晰的状态反馈', '错误提示与恢复入口'],
    collaboration:
      '皮肤是系统的"体表"，把嘴巴生成的结果呈现给用户，把用户的反馈传回反馈系统，让整个生命体与人形成闭环。',
    example: '同一个 AI 能力，在客服场景做成对话界面，在分析师场景做成侧边栏助手，在销售场景做成表单化的工作台。',
    misconception:
      '以为 AI 产品就是"套个聊天框"。实际上好的界面要匹配场景，提供可解释反馈和错误恢复，而不是让用户在黑盒里猜。',
    failureMode: '界面不提供解释和确认，用户看不懂 AI 为什么这么做，出错后也无法撤销，信任逐渐崩塌。',
    executiveQuestion: '用户在使用时能理解 AI 正在做什么吗？出错后能不能方便地纠正或撤销？',
    relatedConcepts: ['Conversational UI', 'Embedded assistant', 'Explainability', 'Error recovery', 'Trust'],
  },

  // ===================== 记忆系统 =====================
  {
    id: 'working-memory',
    nameZh: '工作记忆',
    nameEn: 'Working memory',
    enTerm: 'Working memory · Context window',
    system: 'memory',
    shortDescription: '当前任务中，模型"此刻正在想"的信息。',
    bodyRegionIds: ['UBERON_0002421', 'UBERON_0000451'],
    brainRegionIds: ['UBERON_0002421', 'UBERON_0000451'],
    definition:
      '工作记忆对应模型的上下文窗口——模型在一次对话或任务中"同时拿在手里"的信息。它容量有限，超出窗口的内容会被遗忘或截断，因此需要不断取舍哪些信息值得保留。',
    inputs: ['当前对话与指令', '本轮任务的中间结果', '从长期记忆检索到的内容'],
    processes: ['上下文维护与取舍', '注意力分配', '中间结果暂存'],
    outputs: ['驱动下一步推理的当前上下文', '被淘汰 / 被压缩的信息'],
    collaboration:
      '工作记忆是大脑的"桌面"，需要时从语义记忆和情景记忆拉取资料，用完再把值得沉淀的内容写回长期记忆。',
    example: '一个长达几十轮的分析任务中，工作记忆只保留当前最关键的数字和结论，其余历史被压缩成摘要。',
    misconception:
      '以为模型"记得"对话里说过的每句话。实际上上下文窗口有限，超出的内容会被遗忘，长对话尤其明显。',
    failureMode: '关键信息超出上下文窗口被截断，模型"失忆"，后续回答前后矛盾或丢失重要约束。',
    executiveQuestion: '我们的关键任务会不会超出模型的上下文窗口？哪些信息必须被持久化到外部记忆？',
    relatedConcepts: ['Context window', 'Token limit', 'Attention', 'Context management'],
  },
  {
    id: 'semantic-memory',
    nameZh: '语义记忆',
    nameEn: 'Semantic memory',
    enTerm: 'Semantic memory · RAG · Knowledge base',
    system: 'memory',
    shortDescription: '知识库与 RAG：从外部知识中检索可复用的事实。',
    bodyRegionIds: ['UBERON_0002421', 'UBERON_0000956'],
    brainRegionIds: ['UBERON_0002421', 'UBERON_0000956'],
    definition:
      '语义记忆对应 AI 的外部知识库与检索增强生成（RAG）。它存放公司的产品文档、规章制度、行业知识等"通用事实"，在需要时检索出来喂给模型，弥补模型参数里没有的知识。',
    inputs: ['用户提问 / 任务需求', '结构化的知识库与文档', '检索查询'],
    processes: ['向量检索与关键词检索', '相关性排序', '知识片段注入上下文'],
    outputs: ['检索到的知识片段', '带出处的引用', '更新后的知识库'],
    collaboration:
      '语义记忆为大脑补充"先天知识"之外的事实；消化系统把原始资料加工后写入这里，供后续任务反复调用。',
    example: 'AI 回答"我们的退款政策是什么"时，不靠模型瞎猜，而是从内部知识库检索出准确条款并给出出处。',
    misconception:
      '以为模型参数里已经"装下"了所有知识。实际上企业私有知识不在模型里，必须靠 RAG 从外部取。',
    failureMode: '检索不到相关内容或检索到过时内容，模型基于缺失或陈旧信息作答，甚至编造不存在的规定。',
    executiveQuestion: '我们的知识库多久更新一次？回答关键问题时能不能给出可追溯的出处？',
    relatedConcepts: ['RAG', 'Embedding', 'Vector database', 'Knowledge base', 'Citation'],
  },
  {
    id: 'episodic-memory',
    nameZh: '情景记忆',
    nameEn: 'Episodic memory',
    enTerm: 'Episodic memory · Conversation history',
    system: 'memory',
    shortDescription: '历史对话与任务记录：AI 的"亲身经历"。',
    bodyRegionIds: ['UBERON_0002421', 'UBERON_0001876'],
    brainRegionIds: ['UBERON_0002421', 'UBERON_0001876'],
    definition:
      '情景记忆对应 AI 保存的历史对话与任务记录——"上次和这个客户聊过什么、上次任务卡在哪"。它让 AI 具备连续感，能基于过去的具体经历来服务当下，而不是每次都从零开始。',
    inputs: ['历史对话记录', '过往任务与结果', '用户偏好与反馈'],
    processes: ['对话摘要与归档', '按用户 / 项目检索历史', '经验复用'],
    outputs: ['可检索的历史上下文', '用户画像与偏好', '经验教训'],
    collaboration:
      '情景记忆和语义记忆都挂在海马体上：前者存"发生过的事"，后者存"知道的事实"，共同为工作记忆提供素材。',
    example: 'AI 记得三个月前和这位客户谈过预算上限，这次再报价时主动避开了超出预算的方案。',
    misconception:
      '以为"记住对话"就是复制粘贴所有聊天记录。真正有用的是把历史压缩成可检索、可复用的结构化经验。',
    failureMode: '历史记录检索错乱或张冠李戴，把 A 客户的信息套到 B 客户身上，造成尴尬甚至泄密。',
    executiveQuestion: 'AI 的历史记忆是按用户和项目隔离的吗？不同客户之间的数据会不会串？',
    relatedConcepts: ['Conversation memory', 'User profile', 'Summarization', 'Cross-session memory'],
  },
  {
    id: 'procedural-memory',
    nameZh: '程序记忆',
    nameEn: 'Procedural memory',
    enTerm: 'Procedural memory · Skills · SOP',
    system: 'memory',
    shortDescription: '技能、SOP 与工作方法：AI 的"肌肉记忆"。',
    bodyRegionIds: ['UBERON_0002037', 'UBERON_0002245'],
    brainRegionIds: ['UBERON_0002037', 'UBERON_0002245'],
    definition:
      '程序记忆对应 AI 的技能库与标准作业流程（SOP）——如何开一场例会纪要、如何走报销流程、如何做一份周报。它是可反复调用的"怎么做事"的方法，沉淀在组织里，不随单个员工流失。',
    inputs: ['任务类型与触发条件', '已定义的技能 / SOP 定义', '执行时的参数与上下文'],
    processes: ['技能匹配与调用', 'SOP 步骤执行', '工作方法复用'],
    outputs: ['按标准流程完成的任务', '标准化的产出格式', '可复用的方法模板'],
    collaboration:
      '程序记忆把"怎么做"的步骤交给额叶编排、由双手执行，让小脑般"自动完成"熟练任务成为可能。',
    example: 'AI 按公司既定的 SOP，自动把一次销售拜访整理成 CRM 里的标准记录，格式与同事手工录入完全一致。',
    misconception:
      '以为 AI 的每个任务都要从头教。实际上把成熟的 SOP 沉淀成技能后，AI 可以稳定、批量地重复执行。',
    failureMode: 'SOP 过时或不完整时，AI 仍机械照做，把旧流程的错误批量复制到每一次执行。',
    executiveQuestion: '我们有哪些重复性工作可以被沉淀成 AI 技能？这些 SOP 由谁负责维护和更新？',
    relatedConcepts: ['Skill', 'SOP', 'Workflow', 'Standardization', 'Automation'],
  },

  // ===================== 行动系统 =====================
  {
    id: 'nervous-system',
    nameZh: '神经系统',
    nameEn: 'Nervous system',
    enTerm: 'Agent orchestration · API · MCP',
    system: 'action',
    shortDescription: '连接模型、记忆、工具与外部系统，传递任务状态。',
    bodyRegionIds: ['UBERON_0001021', 'UBERON_0002240'],
    definition:
      '神经系统对应 AI 的编排层：Agent loop、工具调用（Tool calling）、API、MCP、模型路由与多 Agent 协作。它把大脑的意图传导到手脚，把执行结果传回大脑——连接能力决定了 AI 能否进入真实工作。',
    inputs: ['大脑 / 额叶下发的指令', '工具与外部系统的接口', '任务状态与事件'],
    processes: ['Agent 循环 (Agent loop)', '工具调用 (Tool calling)', 'API / MCP 协议通信', '多 Agent 协作与消息传递'],
    outputs: ['对工具的调用请求', '任务状态流转', '汇总回传的结果'],
    collaboration:
      '神经系统是 AI 的"总线"：向上接大脑，向下接双手双脚，左右连接记忆与外部系统，是整个生命体得以协同的关键。',
    example: 'AI 回答"帮我查一下这个客户最近的订单"时，神经系统把大脑的意图翻译成对 CRM 系统的 API 调用，再把返回结果送回大脑组织语言。',
    misconception:
      '以为模型"自己就会用工具"。实际上让模型稳定地、安全地调用外部系统，靠的是编排层精心设计的协议与校验。',
    failureMode: '工具调用链断裂或参数传错，AI 明明"知道"该做什么，却执行不了，最终只能退回"给建议"。',
    executiveQuestion: '我们的 AI 能连接到哪些真实业务系统？连接失败时有没有降级方案？',
    relatedConcepts: ['Agent loop', 'Tool calling', 'MCP', 'API', 'Multi-agent'],
  },
  {
    id: 'hands',
    nameZh: '双手',
    nameEn: 'Hands',
    enTerm: 'Tool use · Computer use',
    system: 'action',
    shortDescription: '让 AI 从"给建议"升级为"完成动作"。',
    bodyRegionIds: ['UBERON_0001134'],
    mappingNote:
      '全身图中没有独立的"手 / 上肢"元素，故映射到骨骼肌（UBERON_0001134）——身体中负责主动执行动作的执行器。',
    definition:
      '双手对应 AI 的工具调用与计算机操作：浏览网页、搜索资料、读写文件、分析表格、执行代码、操作浏览器、调用企业系统、生成文档。模型可能知道该做什么，但没有工具、权限和结果反馈，它仍无法完成任务。',
    inputs: ['要执行的操作目标', '工具与权限清单', '操作系统 / 应用的接口'],
    processes: ['浏览器操作与网页抓取', '文件读写与编辑', '表格与数据分析', '代码执行', '调用 CRM / ERP 等系统'],
    outputs: ['已完成的实际动作', '产出的文件 / 文档 / 表格', '执行结果反馈'],
    collaboration:
      '双手接收神经系统的指令去执行动作，把结果反馈给大脑和额叶，需要时把采集到的数据交给消化系统加工。',
    example: 'AI 不仅告诉你"该去查这几个数据源"，而是真的打开网页抓取信息、填进表格、导出成一份整理好的文件。',
    misconception:
      '以为 AI 只能"动嘴"。加上工具和权限后，它能真正"动手"完成从查资料到生成文件的全过程。',
    failureMode:
      '没有工具或权限时，AI 只能停在"我建议你这样做"，无法真正完成任务；有工具但缺反馈，也会在错误的路上越走越远。',
    executiveQuestion: '我们希望 AI 真正"动手"做哪些事？这些操作涉及哪些权限，由谁审批？',
    relatedConcepts: ['Tool use', 'Computer use', 'Browser automation', 'Code execution', 'File I/O'],
  },
  {
    id: 'feet',
    nameZh: '双脚',
    nameEn: 'Feet',
    enTerm: 'Workflow · Task progression',
    system: 'action',
    shortDescription: '沿着可控路径持续推动任务，而非停在一次回答。',
    bodyRegionIds: ['UBERON_0001135', 'UBERON_0001103'],
    mappingNote:
      '全身图中没有独立的"脚 / 下肢"元素，故映射到平滑肌（UBERON_0001135，驱动胃肠等器官的持续节律性推进）与膈肌（UBERON_0001103，呼吸节律）——代表"持续、有节律地向前推进"的能力。',
    definition:
      '双脚对应任务推进与业务流程：Workflow、状态管理、任务队列、审批节点、重试与异常处理、人机协作。它让 AI 从"回答一个问题"走向"端到端地走完一件事"，并且过程可控、可中断、可追溯。',
    inputs: ['任务流程与状态定义', '队列中的待办任务', '审批与异常规则'],
    processes: ['工作流编排', '状态管理与队列', '审批节点与人机协作', '重试与异常处理'],
    outputs: ['按流程推进的任务状态', '审批与交接记录', '端到端的完成结果'],
    collaboration:
      '双脚让行动保持节律：把神经系统调度的动作串成连续流程，遇到需要人拍板的节点就停下来等审批，出错就重试。',
    example: '一条客户线索进入系统后，AI 按流程自动完成"识别 → 分级 → 分配销售 → 跟进提醒"，中间在关键节点等待人工确认。',
    misconception:
      '以为 AI 只能"一问一答"。真正的价值在于让它按流程把一件事从开始推进到结束，而不是停在某一步。',
    failureMode: '流程缺少异常处理或审批节点，AI 在无人监督下连续出错，或遇到意外情况直接中断。',
    executiveQuestion: '哪些业务我们敢让 AI 端到端推进？哪些步骤必须设人工审批点？',
    relatedConcepts: ['Workflow', 'State machine', 'Task queue', 'Human-in-the-loop', 'Approval node'],
  },
  {
    id: 'mouth',
    nameZh: '嘴巴',
    nameEn: 'Mouth',
    enTerm: 'Generation · TTS · Expression',
    system: 'action',
    shortDescription: '把系统内部结果转化为人能理解的表达。',
    bodyRegionIds: ['UBERON_0001723', 'UBERON_0000167', 'UBERON_0000341'],
    definition:
      '嘴巴对应 AI 的对外表达：文本生成、语音合成（TTS）、报告与摘要、对话界面，乃至数字人或语音助手。它决定系统如何"开口"向人交付结果。表达流畅，不代表结论正确。',
    inputs: ['内部处理完成的结果', '目标受众与格式要求', '语气与风格指令'],
    processes: ['文本生成与润色', '语音合成 (TTS)', '报告 / 摘要撰写', '对话式应答'],
    outputs: ['面向用户的文字 / 语音', '报告、摘要、邮件', '对话界面的回复'],
    collaboration:
      '嘴巴把大脑、额叶和双手产出的结果，通过皮肤（界面）交付给用户，并把反馈再送回反馈系统。',
    example: 'AI 把一份干巴巴的数据表写成一段 CEO 能直接读的简报，并用自然的语音在助手端播报。',
    misconception: '看到 AI 表达流畅、用词得体，就默认它的结论是可靠的。语言能力和事实正确性是两回事。',
    failureMode: '输出文采斐然却掩盖了事实错误——越是流畅的表达，越容易让人放松警惕。',
    executiveQuestion: '我们的 AI 输出在交付前，有没有独立的真实性校验环节，而不只是检查语句是否通顺？',
    relatedConcepts: ['Text generation', 'TTS', 'Digital human', 'Voice assistant', 'Report generation'],
  },

  // ===================== 运行系统 =====================
  {
    id: 'heart',
    nameZh: '心脏',
    nameEn: 'Heart',
    enTerm: 'Compute · Inference engine',
    system: 'runtime',
    shortDescription: '为模型运行持续提供计算能力。',
    bodyRegionIds: ['UBERON_0000948', 'UBERON_0002084', 'UBERON_0002079'],
    definition:
      '心脏对应算力与推理引擎：GPU / 加速器、云端与本地推理、延迟、吞吐、成本与模型规模。它决定模型能不能跑、跑多快、跑多贵。更大的模型并不总是更适合——算力是真实的成本。',
    inputs: ['需要执行的模型推理', '硬件与算力资源', '延迟 / 成本约束'],
    processes: ['GPU / 加速器计算', '云端 / 本地推理', '批处理与并发调度'],
    outputs: ['模型推理结果', '延迟与吞吐指标', '算力成本账单'],
    collaboration:
      '心脏为大脑和所有认知活动供血供氧——没有它，模型只是一堆跑不起来的参数；它还与血液循环配合，把"能量"送到各处。',
    example: '同样是回答问题，小模型在普通服务器上毫秒级响应、成本极低；超大模型则需要 GPU 集群，单次调用成本可能高出几个数量级。',
    misconception:
      '以为"上最强的模型"是唯一选择。实际上算力有真实成本与延迟，选型是在质量、速度、成本之间的权衡。',
    failureMode: '算力不足或调度不当，导致响应缓慢、排队超时，甚至线上服务不可用。',
    executiveQuestion: '我们一个任务的平均推理成本和延迟是多少？有没有用更小的模型做更简单的事？',
    relatedConcepts: ['GPU / Accelerator', 'Inference', 'Latency', 'Throughput', 'Cloud vs On-device'],
  },
  {
    id: 'circulation',
    nameZh: '血液循环',
    nameEn: 'Circulation',
    enTerm: 'Data · Context · Token flow',
    system: 'runtime',
    shortDescription: '信息在感知、模型、记忆、工具与输出之间流动。',
    bodyRegionIds: ['UBERON_0000947', 'UBERON_0001621'],
    definition:
      '血液循环对应数据与 Token 在系统中的流动：Token、上下文传递、数据质量、数据新鲜度与信息丢失。它像血液一样把信息送到需要它的地方——而错误也会像杂质一样沿着这条通路传播。',
    inputs: ['来自感知层的数据', '模型产生的 Token', '记忆与工具返回的信息'],
    processes: ['Token 化与传输', '上下文传递', '数据质量与新鲜度控制'],
    outputs: ['送达各环节的信息', '被丢弃 / 丢失的信息', '沿链路累积的误差'],
    collaboration:
      '血液循环连接心脏、大脑、记忆与工具，是信息的主干道；它的"血质"（数据质量）直接决定整个系统输出的好坏。',
    example: '一个错误的客户数据从 CRM 流出，经过模型加工后被写进给 CEO 的简报——错误就这样从源头一路扩散到决策层。',
    misconception:
      '以为数据是"一次性输入"。实际上数据在系统里持续流动、被反复加工，任何一处的污染都会向下游放大。',
    failureMode: '数据过期或格式不一致，模型基于错误信息做出判断，且错误在链路中层层叠加、难以追溯。',
    executiveQuestion: '我们的关键数据从源头到最终输出，中间经过几道加工？有没有机制防止错误被放大？',
    relatedConcepts: ['Token', 'Data pipeline', 'Data quality', 'Context propagation', 'Error propagation'],
  },
  {
    id: 'digestion',
    nameZh: '消化系统',
    nameEn: 'Digestive system',
    enTerm: 'Data ingestion · Parsing · Indexing',
    system: 'runtime',
    shortDescription: '把原始文档、网页、表格加工成 AI 可用的内容。',
    bodyRegionIds: [
      'UBERON_0000945',
      'UBERON_0002108',
      'UBERON_0002107',
      'UBERON_0001155',
      'UBERON_0001043',
      'UBERON_0001264',
    ],
    definition:
      '消化系统对应数据处理与知识摄取：解析、清洗、切分、标注、Embedding、索引与结构化。它把五花八门的原始资料"消化"成知识库能吸收的养分。垃圾数据进去，只会产出垃圾结果。',
    inputs: ['原始文档 / 网页 / 表格', '非结构化业务数据', '多格式附件'],
    processes: ['解析 (Parsing)', '清洗 (Cleaning)', '切分 (Chunking)', 'Embedding 与索引 (Indexing)', '结构化'],
    outputs: ['可检索的结构化知识', '向量索引', '标注与元数据'],
    collaboration:
      '消化系统把双手采集来的原始资料加工后，写入语义记忆的知识库，供大脑在后续任务中检索复用。',
    example: 'AI 把一堆格式各异的合同 PDF 解析、清洗、切分、向量化后建立索引，之后就能按条款内容快速检索相关合同。',
    misconception:
      '以为"把文件丢给 AI"它就能读懂。实际上未经解析、切分和索引的原始文件，AI 往往无法有效利用。',
    failureMode: '解析错乱或切分不当，把表格拆得支离破碎，知识库检索时要么找不到、要么张冠李戴。',
    executiveQuestion: '我们喂给 AI 的数据质量如何？在进入知识库之前，有没有清洗和质检的环节？',
    relatedConcepts: ['Parsing', 'Chunking', 'Embedding', 'Indexing', 'ETL', 'Data cleaning'],
  },
  {
    id: 'skeleton',
    nameZh: '骨骼',
    nameEn: 'Skeleton',
    enTerm: 'Infrastructure · System architecture',
    system: 'runtime',
    shortDescription: '支撑整个 AI 系统稳定运行的结构。',
    bodyRegionIds: ['UBERON_00024818', 'UBERON_0007844'],
    mappingNote:
      '骨骼在源 SVG 中的 ID 为 UBERON_00024818（上游数据中真实存在但格式异常的 ID），代码原样引用，未做"修正"。',
    definition:
      '骨骼对应 AI 的基础设施与系统架构：模型服务、数据库、向量数据库、云服务、日志、身份认证、可观测性与部署环境。它是让系统立得住、可运维、可扩展的骨架，平时不显眼，缺了却寸步难行。',
    inputs: ['模型服务与计算资源', '各类数据库与存储', '云 / 部署环境'],
    processes: ['模型服务部署与托管', '数据库与向量库管理', '日志与可观测性', '身份认证与访问控制'],
    outputs: ['稳定运行的系统底座', '日志与监控指标', '可扩展的部署环境'],
    collaboration:
      '骨骼支撑起整个生命体：心脏的算力、血液循环的数据、免疫系统的审计，都依赖骨骼提供的稳定环境来运行。',
    example: 'AI 产品上线后，用户量增长时能平滑扩容、出问题时能靠日志快速定位——这些看不见的能力都来自基础设施。',
    misconception:
      '以为 AI 产品就是"模型 + 界面"。实际上没有数据库、日志、监控和认证这些骨架，模型再强也无法可靠地服务真实用户。',
    failureMode: '缺少监控和日志，系统出问题时无从定位；缺少认证，数据和接口暴露在风险之下。',
    executiveQuestion: '我们的 AI 系统有没有可观测性和日志？出问题时能否快速定位，而不是靠猜？',
    relatedConcepts: ['Model serving', 'Vector DB', 'Observability', 'Authentication', 'Cloud infrastructure'],
  },

  // ===================== 安全与进化系统 =====================
  {
    id: 'immune',
    nameZh: '免疫系统',
    nameEn: 'Immune system',
    enTerm: 'Safety · Privacy · Guardrails',
    system: 'safety',
    shortDescription: '防止错误、越权、泄露和不可控的行动。',
    bodyRegionIds: ['UBERON_0000029', 'UBERON_0002106', 'UBERON_0002372', 'CL_0000738'],
    definition:
      '免疫系统对应 AI 的安全与护栏：身份权限、数据隐私、Prompt injection 防御、内容安全、工具调用审批、Human-in-the-loop 与审计日志。AI 安全不能只靠一句系统提示词。',
    inputs: ['用户身份与权限', '待执行的操作与数据', '内容与行为风险信号'],
    processes: ['身份与权限校验', 'Prompt injection 检测', '内容安全过滤', '工具调用审批 (Human-in-the-loop)', '审计日志记录'],
    outputs: ['放行 / 拦截的决策', '审计日志', '风险告警'],
    collaboration:
      '免疫系统像遍布全身的淋巴结，在神经系统的每一次工具调用、消化系统的每一次数据写入处设卡，拦截越权和有害行为。',
    example: 'AI 要调用一个涉及客户隐私的接口时，免疫系统先校验执行者权限，要求人工审批，并把这次调用完整记录进审计日志。',
    misconception:
      '以为在系统提示词里写一句"不要做坏事"就能保证安全。真正的安全需要权限、审批、审计和注入防御等多层机制。',
    failureMode: '被 Prompt injection 攻击诱导泄露数据，或在无人审批时执行了越权操作，且事后无日志可查。',
    executiveQuestion: '我们的 AI 执行敏感操作前有没有人工审批？所有关键动作是否都有可追溯的审计日志？',
    relatedConcepts: ['Prompt injection', 'RBAC / IAM', 'Human-in-the-loop', 'Audit log', 'Content safety'],
  },
  {
    id: 'feedback',
    nameZh: '反馈系统',
    nameEn: 'Feedback system',
    enTerm: 'Evaluation · Feedback · Optimization',
    system: 'safety',
    shortDescription: '根据执行结果和用户反馈，持续校准系统表现。',
    bodyRegionIds: ['UBERON_0002369', 'UBERON_0000007', 'UBERON_0002046'],
    brainRegionIds: ['UBERON_0001905', 'UBERON_0001898'],
    definition:
      '反馈系统对应 AI 的评估与优化：Evaluation、用户反馈、任务成功率、模型与 Prompt 迭代、日志分析、奖励信号、离线与线上评测。"感觉不错"不等于可靠——只有被持续测量和校准，系统才会真的变好。',
    inputs: ['任务执行结果', '用户反馈与评分', '日志与成功率指标'],
    processes: ['离线评测与线上评测', '用户反馈收集', '任务成功率分析', '模型与 Prompt 迭代', '奖励信号设计'],
    outputs: ['评测分数与报告', '改进后的模型 / Prompt', '可量化的质量指标'],
    collaboration:
      '反馈系统像内分泌系统，把"结果好不好"的信号传回大脑和额叶，驱动模型与流程的持续迭代，让系统在真实使用中进化。',
    example: 'AI 每周自动统计各任务的用户满意度和成功率，发现"合同摘要"环节出错率高，于是针对性地优化提示词并回归测试。',
    misconception: '以为"上线就完事"。没有持续评测和反馈，系统的问题会被掩盖，甚至悄悄退化而不自知。',
    failureMode: '只看"感觉不错"，没有量化指标；一个问题反复出现却无人发现，系统长期处于低质量状态。',
    executiveQuestion: '我们用什么指标衡量 AI 的质量？多久做一次评估，发现问题后由谁负责改进？',
    relatedConcepts: ['Evaluation', 'Evals', 'Feedback loop', 'Prompt iteration', 'Online vs Offline eval'],
  },
];

export const STRUCTURE_BY_ID: Record<string, Structure> = Object.fromEntries(
  STRUCTURES.map((s) => [s.id, s]),
);
