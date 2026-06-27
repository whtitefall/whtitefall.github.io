window.BLOG = {
  site: {
    title: "Yuanzheng Hu",
    subtitle: "Software development, AI tooling, system design, and project notes.",
    author: "Yuanzheng Hu"
  },
  posts: [
    {
      id: "start-github-pages-blog",
      title: "把 GitHub Pages 变成自己的技术博客",
      date: "2026-06-26",
      readTime: "4 分钟",
      tags: ["GitHub Pages", "静态网站", "写作"],
      excerpt: "用一个没有后端的静态站点开始写博客，先把发布链路跑通，再慢慢打磨内容和样式。",
      content: `
        <p>做个人博客最重要的不是一开始就选到完美框架，而是让写作和发布足够轻。GitHub Pages 的优势在这里很明显：代码、文章、版本历史和发布都在一个仓库里。</p>
        <h2>先把路径压短</h2>
        <p>这个博客故意没有引入构建工具。你只需要编辑 <code>assets/js/posts.js</code>，新增一条文章数据，提交到 GitHub，Pages 就会自动发布。</p>
        <p>后续如果文章多起来，可以再迁移到 Jekyll、Astro 或 Hugo。早期先用简单结构，能降低维护成本。</p>
        <h2>发布方式</h2>
        <p>仓库里已经带了 GitHub Actions 工作流。推送到 <code>main</code> 分支后，它会把当前目录作为静态网站发布到 GitHub Pages。</p>
        <blockquote>先让博客能持续更新，再考虑复杂的主题、评论系统和搜索索引。</blockquote>
      `
    },
    {
      id: "ai-tooling-notes",
      title: "从一个小工具开始整理 AI 工作流",
      date: "2026-06-18",
      readTime: "5 分钟",
      tags: ["AI 工具", "工程实践", "复盘"],
      excerpt: "把 AI 辅助开发当成一条工作流来整理，而不是只记录零散提示词。",
      content: `
        <p>AI 工具最容易被低估的部分，是它们和已有工程习惯之间的衔接。一个好用的工作流通常不是更长的提示词，而是更清楚的输入、约束和验证方法。</p>
        <h2>把上下文固定下来</h2>
        <p>每次开始任务前，先明确目标、边界、现有文件和验证方式。这样可以减少反复解释，也能让输出更容易落地。</p>
        <h2>保留验证环节</h2>
        <p>AI 生成的代码仍然需要测试、审查和运行。把这些动作写成脚本或清单，长期看比记住某个提示词更有价值。</p>
        <ul>
          <li>先让任务足够小。</li>
          <li>让输出尽量可运行。</li>
          <li>用测试和截图确认结果。</li>
        </ul>
      `
    },
    {
      id: "system-design-first-pass",
      title: "系统设计学习笔记：先画约束再写方案",
      date: "2026-06-10",
      readTime: "6 分钟",
      tags: ["系统设计", "学习笔记", "架构"],
      excerpt: "系统设计题不是先堆组件名，而是先把目标、流量、数据和故障边界画清楚。",
      content: `
        <p>系统设计的第一步不是选数据库，也不是画一堆微服务。更有效的方式，是先把约束写出来：读写比例、延迟目标、数据规模、可用性要求和失败场景。</p>
        <h2>先问四类问题</h2>
        <ol>
          <li>用户是谁，核心动作是什么？</li>
          <li>数据量和请求量大概是多少？</li>
          <li>一致性、延迟和可用性哪个更关键？</li>
          <li>系统最可能在哪里失败？</li>
        </ol>
        <p>这些问题回答清楚后，组件选择会自然很多。缓存、队列、索引、分片都应该服务于明确的约束，而不是为了显得复杂。</p>
      `
    }
  ]
};
