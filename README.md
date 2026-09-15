# AI 解剖学 · Anatomy of an AI System

> 一个智能系统如何感知、思考、记忆与行动。

**LLM 是 AI 的大脑，但大脑并不等于完整的 AI 系统。**

**在线体验**：<https://ccdsm1129-a11y.github.io/Anatomy-of-an-AI-System/>

本项目用一个可交互的人体解剖图作为**信息架构的隐喻**，把一个完整的 AI 系统拆成 6 大系统、20 个结构，帮助非技术用户、企业管理者和 CEO 理解：除了大语言模型，一个能真正在业务中运转的 AI 系统还需要感知、记忆、行动、运行、安全与反馈机制。

> ⚠️ 这是教学隐喻，不是人体医学科普产品，也不宣称人体与计算机系统存在严格的科学对应关系。

---

## 目录

- [它解决什么问题](#它解决什么问题)
- [快速开始](#快速开始)
- [界面与交互](#界面与交互)
- [项目结构](#项目结构)
- [AI 概念 ↔ 人体解剖映射表](#ai-概念--人体解剖映射表)
- [技术要点](#技术要点)
- [已实现功能](#已实现功能)
- [已知限制](#已知限制)
- [可扩展的任务场景](#可扩展的任务场景)
- [技术栈](#技术栈)
- [部署到 GitHub Pages](#部署到-github-pages)
- [许可与署名](#许可与署名)

---

## 它解决什么问题

很多企业把「上 AI」等同于「接一个大模型 API」。实际上，一个可用的 AI 系统需要完成一条完整的链路：

```
感知世界 → 理解任务 → 推理 → 规划 → 调用记忆 → 使用工具
   → 执行行动 → 检查权限与风险 → 接收结果反馈 → 持续调整
```

本项目把这条链路上的每个组件对应到人体结构上，让你可以通过「探索身体」来理解系统的**作用、连接关系与协作过程**，而不是背术语表。

六个系统分组：

| 系统 | 覆盖结构 | 回答的问题 |
|---|---|---|
| **感知系统** | 眼睛、耳朵、皮肤 | AI 怎么"看到"和"听到"世界？ |
| **认知系统** | 大脑、额叶、模型路由 | 理解、推理、规划发生在哪里？ |
| **记忆系统** | 工作记忆、语义记忆、情景记忆、程序记忆 | 上下文、知识库、历史记录不是一回事 |
| **行动系统** | 神经系统、双手、双脚、嘴巴 | AI 怎么从"给建议"变成"完成任务"？ |
| **运行系统** | 心脏、血液循环、消化系统、骨骼 | 算力、数据流、知识摄取、基础设施 |
| **安全与进化系统** | 免疫系统、反馈系统 | 如何防止越权、泄露、不可控行动并持续优化？ |

---

## 快速开始

需要 Node.js 18+。

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（推荐，带 HMR）
npm run dev
#    浏览器打开 http://localhost:5173/
```

也可以构建静态产物：

```bash
npm run build
# 产物在 dist/，为相对路径的自包含文件，可直接双击 dist/index.html 使用（无需服务器）
```

> ⚠️ **不要直接双击根目录的 `index.html`**：它是 Vite 入口，引用了 `.ts` 源文件，必须经 Vite 转译。请使用 `npm run dev` 或构建后的 `dist/index.html`。

其他命令：

```bash
npm run preview        # 本地预览构建产物
npx tsc --noEmit       # TypeScript 类型检查（应零错误）
```

---

## 界面与交互

### 三栏布局

- **左栏**：六大系统导航、结构列表、视图切换（完整系统 / 大脑特写）、探索进度、任务演示入口、声音开关
- **中栏**：可交互的人体解剖 SVG，含当前系统标题、图例、结构标注与调用路径
- **右栏**：结构详情面板（分层展示，避免第一屏信息过载）

### 交互方式

| 操作 | 效果 |
|---|---|
| 悬停人体区域 | 区域轻微加深 + 显示结构名称（无位移、无发光） |
| 点击区域或左栏条目 | 选中结构、其余区域降低对比度、当前区域暖色突出、右栏展开详情、标记为已探索 |
| 右栏「显示连接」 | 以医学图鉴风格的纤细引导线展示当前结构与上下游的关系 |
| 完整系统 ↔ 大脑特写 | 两视图共享选中状态与信息面板，切换为克制的淡入淡出 |
| 键盘 | `Tab` 在 SVG 交互区域间移动，`Enter` / `Space` 选中 |
| 「观看 AI 完成任务」 | 启动 11 步引导式演示，可开始 / 暂停 / 继续 / 上一步 / 下一步 / 退出 |

### 每个结构提供的内容

核心解释、它做什么、接收什么、输出什么、如何协作、真实任务中的例子、常见误解、失败时会发生什么、**CEO / 管理者应该追问的问题**、相关概念，以及（如有）地图映射说明。

### 任务演示

首个完整任务是 **「研究一家潜在客户，并生成一份 CEO 拜访简报」**，按真实逻辑依次激活 11 个结构：

```
眼睛 → 耳朵 → 记忆系统 → 大脑 → 额叶 → 神经系统
   → 双手 → 消化系统 → 免疫系统 → 嘴巴 → 反馈系统
```

每一步都显示当前结构在做什么，以及该步骤的**输入 / 处理 / 输出**，而不只是播放动画。演示结束后给出结论：

> 完成这项任务，一共动用了 11 个系统。LLM 只是其中之一。

---

## 项目结构

```
Anatomy of an AI System/
├── index.html                   # Vite 入口 HTML
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── src/
    ├── main.ts                  # 应用入口，组装所有模块
    ├── types.ts                 # 类型定义
    ├── vite-env.d.ts            # ?raw 导入的类型声明
    ├── styles/
    │   ├── tokens.css           # 设计令牌（颜色 / 字体 / 间距 / 尺寸）
    │   ├── base.css             # reset + 排版 + 焦点态 + 滚动条
    │   ├── layout.css           # 三栏布局 + 响应式断点
    │   └── components.css       # 导航 / 画布 / 面板 / 演示 / 顶栏
    ├── data/                    # ★ 所有内容与关系均在此集中配置
    │   ├── systems.ts           # 6 大系统、配色、结构归属
    │   ├── structures.ts        # 20 个结构的完整中文内容
    │   ├── connections.ts       # 关系图（有向边，供连接展示与图谱扩展）
    │   └── taskDemo.ts          # 11 步任务演示 + 预留任务入口
    ├── svg/
    │   ├── svgRaw.ts            # 以 ?raw 在构建期内联两张 SVG
    │   └── anatomogram.ts       # SVG 注入 / 初始化 / 高亮 / 连线 / 标注
    ├── state/
    │   └── store.ts             # 单一状态源（pub/sub）
    ├── persistence/
    │   └── storage.ts           # localStorage（进度 / 声音 / 视图）
    ├── audio/
    │   └── sound.ts             # Web Audio API 合成触感音
    └── ui/
        ├── nav.ts               # 左栏导航
        ├── canvas.ts            # 中栏 SVG 探索
        ├── panel.ts             # 右栏信息面板
        └── demo.ts              # 任务演示控制器
```

**设计约定**：内容与关系全部放在 `src/data/`，不散落硬编码在 UI 组件中。新增结构或调整映射只需改数据配置。

---

## AI 概念 ↔ 人体解剖映射表

两张 SVG 均来自 npm 包 [`@ebi-gene-expression-group/anatomogram`](https://www.npmjs.com/package/@ebi-gene-expression-group/anatomogram)：

- `homo_sapiens.male.svg` — 完整系统（人体全身，82 个 EFO 元素）
- `homo_sapiens.brain.svg` — 大脑特写（28 个 EFO 元素）

> 下表中所有 ID 均为这两张 SVG 中**真实存在**的 UBERON / CL ID（已逐项解析核实）。标 ⚠️ 的条目为「最近真实区域」组合映射，**未伪造任何器官 ID**。

| # | 结构 | 所属系统 | 完整系统 SVG 的 ID | 大脑特写 SVG 的 ID | 映射说明 |
|---|---|---|---|---|---|
| 1 | 大脑 · LLM | 认知 | `UBERON_0000955`, `UBERON_0000956` | `UBERON_0000956`, `UBERON_0001870/1871/1872`, `UBERON_0002021` | — |
| 2 | 额叶 · Reasoning & Planning | 认知 | `UBERON_0001870`, `UBERON_0000451` | `UBERON_0000451`, `UBERON_0001870`, `UBERON_0002702` | — |
| 3 | 模型路由 · Model Routing | 认知 | `UBERON_0000955` | `UBERON_0001897`（丘脑）, `UBERON_0001894`（间脑） | 丘脑 = 信息中继 / 路由 |
| 4 | 眼睛 · Vision & OCR | 感知 | `UBERON_0000970`, `UBERON_0000966`（视网膜） | `UBERON_0002021`（枕叶 · 视觉皮层） | — |
| 5 | 耳朵 · Speech & Audio | 感知 | `UBERON_0001871`（颞叶） | `UBERON_0001871`, `UBERON_0002771` | ⚠️ SVG 无耳部元素 → 颞叶（听觉皮层） |
| 6 | 嘴巴 · Generation & TTS | 行动 | `UBERON_0001723`（舌）, `UBERON_0000167`（口腔）, `UBERON_0000341`（咽喉） | — | — |
| 7 | 工作记忆 · Working Memory | 记忆 | `UBERON_0002421`, `UBERON_0000451` | `UBERON_0002421`, `UBERON_0000451` | — |
| 8 | 语义记忆 · Semantic Memory / RAG | 记忆 | `UBERON_0002421`, `UBERON_0000956` | `UBERON_0002421`, `UBERON_0000956` | — |
| 9 | 情景记忆 · Episodic Memory | 记忆 | `UBERON_0002421`, `UBERON_0001876`（杏仁核） | `UBERON_0002421`, `UBERON_0001876` | — |
| 10 | 程序记忆 · Procedural Memory / Skills | 记忆 | `UBERON_0002037`, `UBERON_0002245`（小脑半球） | `UBERON_0002037`, `UBERON_0002245` | — |
| 11 | 神经系统 · Agent Orchestration | 行动 | `UBERON_0001021`（神经）, `UBERON_0002240`（脊髓） | — | — |
| 12 | 双手 · Tool Use | 行动 | `UBERON_0001134`（骨骼肌） | — | ⚠️ SVG 无上肢 → 骨骼肌（动作执行器） |
| 13 | 双脚 · Workflow & Task Progress | 行动 | `UBERON_0001135`（平滑肌）, `UBERON_0001103`（膈肌） | — | ⚠️ SVG 无下肢 → 平滑肌 + 膈肌（节律推进） |
| 14 | 心脏 · Compute & Inference | 运行 | `UBERON_0000948`, `UBERON_0002084`（左心室）, `UBERON_0002079`（左心房） | — | — |
| 15 | 血液循环 · Data & Token Flow | 运行 | `UBERON_0000947`（主动脉）, `UBERON_0001621`（冠状动脉） | — | — |
| 16 | 消化系统 · Data Processing | 运行 | `UBERON_0000945`（胃）, `UBERON_0002108`（小肠）, `UBERON_0002107`（肝）, `UBERON_0001155`（结肠）, `UBERON_0001043`（食管）, `UBERON_0001264`（胰腺） | — | — |
| 17 | 骨骼 · Infrastructure | 运行 | **`UBERON_00024818`**, `UBERON_0007844`（软骨） | — | ⚠️ 源 SVG 中该 ID 格式异常，原样引用未改写 |
| 18 | 免疫系统 · Security & Guardrails | 安全 | `UBERON_0000029`（淋巴结）, `UBERON_0002106`（脾）, `UBERON_0002372`（扁桃体）, `CL_0000738`（白细胞） | — | — |
| 19 | 皮肤 · Product Interface | 感知 | `UBERON_0000014` | `UBERON_0002360`（脑膜） | — |
| 20 | 反馈系统 · Evaluation & Feedback | 安全 | `UBERON_0002369`（肾上腺）, `UBERON_0000007`（垂体）, `UBERON_0002046`（甲状腺） | `UBERON_0001905`（松果体）, `UBERON_0001898`（下丘脑） | — |

完整 `bodyRegionIds` / `brainRegionIds` 见 `src/data/structures.ts`。

---

## 技术要点

这部分是本项目相对容易踩坑的地方，实现细节记录如下：

- **SVG 构建期内联**：通过 Vite 的 `?raw` 在构建时把两张 SVG 源码打进 JS，**运行时零 fetch**，因此 `dist/index.html` 可直接以 `file://` 打开。
- **默认可见性修复**：源 SVG 的元素带 `style="fill:none;stroke:none"`，直接渲染不可见。应用在**任何高亮逻辑之前**先为相关元素赋默认 `fill` / `stroke`，并对目标组及其所有后代形状统一赋值（`stroke` 不继承）。
- **防御性清理**：初始化时移除 SVG 及其父级中可能存在的 `visibility:hidden`，并剥离 XML 声明与注释。
- **保留 UBERON ID**：**未使用 SVGO**，未删除、压缩或改写任何元素 ID —— 这些 ID 是定位与控制人体结构的依据。
- **`<use>` 引用解析**：血细胞等元素通过 `<use xlink:href="#CL_0000738">` 引用基础形状，高亮时会解析引用，确保引用的形状跟随一起被染色。
- **变换感知的坐标映射**：SVG 元素大量使用 `transform` 矩阵。连接线与标注的位置通过 `getScreenCTM().inverse()` + `DOMPoint.matrixTransform` 在运行时把屏幕坐标映射回 viewBox 坐标，正确处理矩阵与 letterbox，不使用静态坐标。
- **克制的高亮策略**：不使用发光、霓虹描边或大幅位移；选中用暖色实填 + 细描边，未选中区域降低对比度。
- **无障碍**：SVG 交互区域带 `role="button"`、`tabindex="0"`、可读 `aria-label`；选中状态不单靠颜色表达；信息面板打开后保持合理焦点顺序；支持 `prefers-reduced-motion`。
- **声音可选**：默认关闭。仅在用户首次主动点击后才初始化 `AudioContext`，用 Web Audio API 合成极短、低音量的触感音（纸张 / 木质 / 机械卡扣），不播放任何背景音乐。

---

## 已实现功能

- [x] 两张 SVG 正确显示与交互（完整系统 / 大脑特写），切换共享状态
- [x] UBERON ID 保留完整，未被任何优化工具删除或改写
- [x] `visibility:hidden` 已处理，默认 `fill` / `stroke` 早于高亮逻辑应用
- [x] 点击 SVG 区域与点击左栏导航得到完全相同的结果
- [x] 20 个结构全部具备真实、完整的分层内容
- [x] 悬停 / 点击 / 键盘（`Tab` + `Enter`）三种操作路径均可用
- [x] 「显示连接」关系展示（医学图鉴式引导线）
- [x] 任务演示可完整运行：11 步，支持开始 / 暂停 / 继续 / 上一步 / 下一步 / 退出
- [x] 探索进度本地保存（localStorage），可重置（`X / 20`）
- [x] 声音开关有效且默认关闭，偏好本地保存
- [x] 响应式：桌面三栏 → 平板抽屉 → 移动底部面板
- [x] `npx tsc --noEmit` 零错误，生产构建通过，控制台无报错

---

## 已知限制

1. **耳朵与四肢没有直接对应的解剖元素**。源 SVG 中不存在耳、手、脚的结构，因此采用「最近真实区域」组合映射：耳朵 → 颞叶（听觉皮层）、双手 → 骨骼肌（动作执行器）、双脚 → 平滑肌 + 膈肌（节律推进）。这些映射在信息面板的「映射说明」中如实记录，未伪造器官。
2. **骨骼 ID 格式异常**。源 SVG 中骨骼的 ID 为 `UBERON_00024818`（上游数据本身的格式问题），代码原样引用，未做「修正」以免与源数据脱节。
3. **微小区域点击不便**。在完整系统视图中，部分脑区（如海马体）面积过小，鼠标难以直接点中；建议通过左栏导航或键盘选中，或切换到大脑特写视图精细探索。
4. **男性解剖图保留医学插画原貌**，包含乳腺、生殖器官等性别特征器官，作为完整的医学解剖示意。
5. **血细胞级微观结构未单独映射**。`<use>` 引用的 B / T / NK 等白细胞亚型统一作为免疫系统的整体示意。
6. **上游依赖较旧**。`@ebi-gene-expression-group/anatomogram@2.4.0` 依赖 React 16 / styled-components 4 等旧包，`npm install` 时会有 audit 警告；本项目仅复用其 SVG 资产，不导入其 React 组件，不影响运行。
7. **构建产物体积偏大**（JS 约 1.35 MB / gzip 约 512 KB），原因是两张 SVG 源码全量内联。这是为了换取「零运行时请求 + 可 `file://` 直开」而做的取舍；若需减小体积，可改为按需异步加载 SVG 或做 gzip/brotli 预压缩。

---

## 可扩展的任务场景

`src/data/taskDemo.ts` 中的 `UPCOMING_TASKS` 已预留以下任务入口（当前在界面中标记为「即将开放」，未做假按钮）：

- 分析一份财务报告
- 制作一份演示文稿
- 自动处理客户线索
- 总结会议并创建后续任务

每条已写入数据层，复制第一个任务的模板补全步骤即可启用。

---

## 技术栈

| 项 | 选择 |
|---|---|
| 构建 | Vite 5 |
| 语言 | TypeScript 5（严格模式） |
| 框架 | 无（原生 DOM，零运行时框架依赖） |
| 解剖图资产 | [`@ebi-gene-expression-group/anatomogram`](https://www.npmjs.com/package/@ebi-gene-expression-group/anatomogram) 2.4.0 |
| 字体 | Noto Serif SC（标题）/ Noto Sans SC（正文）/ IBM Plex Mono（技术术语） |

### 设计原则

配色为象牙白背景配低饱和强调色（暗酒红 / 赭石 / 陶土红 / 黄铜 / 灰绿 / 烟棕）。整体追求「可交互的专业参考资料」而非 SaaS 仪表盘：留白充足、边框细而清晰、圆角克制（≤ 4px）、视觉层次依靠字号 / 留白 / 线条 / 色彩而非阴影。

明确**不使用**：蓝紫渐变、霓虹色、发光效果、玻璃拟态、大面积圆角卡片、漂浮粒子、机器人头像、电路大脑等常见 AI 科技视觉。

---

## 部署到 GitHub Pages

仓库已内置工作流 `.github/workflows/deploy-pages.yml`，推送到 `main` 后自动构建并发布，也可在 Actions 页面手动触发。

首次启用（只需一次）：

1. 打开仓库 **Settings → Pages**
2. 将 **Source** 设为 **GitHub Actions**
3. 推送到 `main`，或在 **Actions → Deploy to GitHub Pages → Run workflow** 手动触发

发布地址：<https://ccdsm1129-a11y.github.io/Anatomy-of-an-AI-System/>

之所以能在 Pages 子路径下正常工作，是因为 `vite.config.ts` 中设置了 `base: './'`（相对路径）。同一份构建产物因此既可用于 Pages 子目录，也能以 `file://` 直接打开。

---

## 许可与署名

本项目采用 **MIT License**，详见 [LICENSE](./LICENSE)。你可自由使用、修改、分发本项目代码（包括商业用途），只需保留版权声明。

**第三方资产说明**：两张人体解剖 SVG（`homo_sapiens.male.svg`、`homo_sapiens.brain.svg`）来自 [European Bioinformatics Institute (EBI)](https://www.ebi.ac.uk/) 以 **Apache-2.0** 协议发布的 [`@ebi-gene-expression-group/anatomogram`](https://www.npmjs.com/package/@ebi-gene-expression-group/anatomogram) 包，**版权归 EBI 所有，不适用本项目的 MIT 许可**。本项目保留其在 SVG 内嵌的署名图标（链接至 <https://www.ebi.ac.uk/gxa/licence.html>）。二次分发时请一并遵守上游许可条款。

### 致谢

- [Expression Atlas](https://www.ebi.ac.uk/gxa/) / EBI —— 提供 Anatomogram 解剖图资产与 UBERON 本体标注
- [UBERON](http://obofoundry.org/ontology/uberon.html) —— 跨物种解剖学本体
