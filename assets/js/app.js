(function () {
  const blog = window.BLOG || { site: {}, posts: [] };
  const posts = [...blog.posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const page = document.body.dataset.page || "";
  const state = {
    lang: localStorage.getItem("site-lang") === "zh" ? "zh" : "en",
    tag: "All",
    query: ""
  };

  const translations = {
    en: {
      "skip.resume": "Skip to resume",
      "skip.posts": "Skip to posts",
      "skip.content": "Skip to content",
      "nav.resume": "Resume",
      "nav.blog": "Blog",
      "theme.dark": "Dark",
      "theme.light": "Light",
      "resume.role": "Software Developer",
      "resume.headline": "SDE at Nokia in Ottawa, with experience across optical management systems, Java Spring Boot, React, Python, machine learning, automation, and firmware testing.",
      "action.linkedin": "View LinkedIn",
      "action.blog": "Read Blog",
      "fact.current": "Current",
      "fact.currentValue": "Software Developer @ Nokia",
      "fact.location": "Location",
      "fact.locationValue": "Greater Ottawa Area",
      "fact.education": "Education",
      "fact.educationValue": "MSc and BSc, Computer Science",
      "fact.languages": "Languages",
      "fact.languagesValue": "English, Chinese",
      "profile.kicker": "Profile",
      "profile.title": "About",
      "profile.body": "Interested in machine learning, adversarial attack, model pruning, reinforcement learning, and transfer learning related topics. My work spans software development, visualization tools, graph neural networks, research tooling, automation, and firmware testing.",
      "experience.kicker": "Experience",
      "experience.title": "Work",
      "job.nokiaCurrent.date": "May 2023 - Present",
      "job.nokiaCurrent.title": "Software Developer, Nokia",
      "job.nokiaCurrent.body": "Optical Management System developer on the WaveSuite team.",
      "job.nokiaPast.date": "May 2022 - Dec 2022",
      "job.nokiaPast.title": "Software Developer, Nokia",
      "job.nokiaPast.body": "NFM-T developer. Developed an advanced OTDR diagnosis visualization tool.",
      "job.ta.date": "Jan 2022 - Dec 2022",
      "job.ta.title": "Teaching Assistant, University of Ottawa",
      "job.ta.body": "CSI 2110 Data Structures and Algorithms; CSI 3140 WWW Structures, Techniques and Standards.",
      "job.silexon.date": "Mar 2021 - Jun 2021",
      "job.silexon.title": "Machine Learning Engineer, Silexon AI",
      "job.silexon.body": "Worked on graph neural network algorithms for drug and protein reaction prediction.",
      "job.raMotion.date": "May 2020 - Aug 2020",
      "job.raMotion.title": "Research Assistant, University of Ottawa",
      "job.raMotion.body": "Built data analysis and visualization tooling for skeleton motion and human wearable equipment.",
      "job.microsemi.date": "Sep 2019 - Dec 2019",
      "job.microsemi.title": "Software Engineer, Microsemi Corporation",
      "job.microsemi.body": "Worked on firmware development and testing for the time synchronization team.",
      "job.orbcomm.date": "Jan 2019 - Apr 2019",
      "job.orbcomm.title": "Hardware Automation Engineer, ORBCOMM",
      "job.orbcomm.body": "Developed multi-threaded and multi-processing automation for power supplies, temperature chambers, antennas, multimeters, spectrum analyzers, and desktop voltage visualization.",
      "job.raCommunity.date": "May 2018 - Aug 2018",
      "job.raCommunity.title": "Research Assistant, University of Ottawa",
      "job.raCommunity.body": "Re-implemented a community detection algorithm and used multi-threading and multi-processing techniques to optimize runtime.",
      "skills.kicker": "Skills",
      "skills.title": "Technical Areas",
      "education.kicker": "Education",
      "education.title": "Education",
      "education.master": "Master's degree, Computer Science with Concentration in Artificial Intelligence, 2021 - 2023",
      "education.bachelor": "Bachelor of Science, Computer Science, 2016 - 2020",
      "research.kicker": "Research",
      "research.title": "Publications",
      "research.pub1": "Convolutional Neural Networks in Multi-Class Classification of Medical Data",
      "research.pub2": "Explainable Multi-class Classification of Medical Data",
      "research.pub3": "Explainable Multi-class Classification of the CAMH COVID-19 Mental Health Data",
      "research.honor": "Honor",
      "research.award": "Merit scholarship",
      "blog.kicker": "Writing",
      "blog.note": "Notes",
      "blog.title": "Blog",
      "blog.subtitle": "Notes on software development, AI tooling, system design, and shipping small useful products.",
      "blog.latest": "Latest",
      "blog.posts": "Posts",
      "blog.statPosts": "posts",
      "blog.statTopics": "topics",
      "blog.search": "Search",
      "blog.searchPlaceholder": "Search title, tag, or summary",
      "blog.emptyTitle": "No posts found",
      "blog.emptyBody": "Try another keyword or topic.",
      "post.back": "← Back to Blog",
      "post.related": "Continue Reading",
      "notFound.title": "Page not found",
      "notFound.body": "This link does not match an existing page or post.",
      "notFound.action": "Back to Resume"
    },
    zh: {
      "skip.resume": "跳到简历内容",
      "skip.posts": "跳到文章列表",
      "skip.content": "跳到正文",
      "nav.resume": "简历",
      "nav.blog": "博客",
      "theme.dark": "深色",
      "theme.light": "浅色",
      "resume.role": "软件开发工程师",
      "resume.headline": "现任 Nokia 软件开发工程师，位于 Ottawa。经验覆盖光网络管理系统、Java Spring Boot、React、Python、机器学习、自动化和固件测试。",
      "action.linkedin": "查看 LinkedIn",
      "action.blog": "阅读博客",
      "fact.current": "当前",
      "fact.currentValue": "Nokia 软件开发工程师",
      "fact.location": "所在地",
      "fact.locationValue": "Greater Ottawa Area",
      "fact.education": "教育",
      "fact.educationValue": "计算机科学硕士与本科",
      "fact.languages": "语言",
      "fact.languagesValue": "英语、中文",
      "profile.kicker": "个人简介",
      "profile.title": "关于",
      "profile.body": "关注机器学习、对抗攻击、模型剪枝、强化学习和迁移学习等方向。工作经历覆盖软件开发、可视化工具、图神经网络、研究工具、自动化和固件测试。",
      "experience.kicker": "经历",
      "experience.title": "工作经历",
      "job.nokiaCurrent.date": "2023 年 5 月 - 至今",
      "job.nokiaCurrent.title": "软件开发工程师，Nokia",
      "job.nokiaCurrent.body": "WaveSuite 团队光网络管理系统开发。",
      "job.nokiaPast.date": "2022 年 5 月 - 2022 年 12 月",
      "job.nokiaPast.title": "软件开发工程师，Nokia",
      "job.nokiaPast.body": "NFM-T 开发，负责高级 OTDR 诊断可视化工具。",
      "job.ta.date": "2022 年 1 月 - 2022 年 12 月",
      "job.ta.title": "助教，University of Ottawa",
      "job.ta.body": "CSI 2110 Data Structures and Algorithms；CSI 3140 WWW Structures, Techniques and Standards。",
      "job.silexon.date": "2021 年 3 月 - 2021 年 6 月",
      "job.silexon.title": "机器学习工程师，Silexon AI",
      "job.silexon.body": "图神经网络算法相关工作，用于药物与蛋白质反应预测。",
      "job.raMotion.date": "2020 年 5 月 - 2020 年 8 月",
      "job.raMotion.title": "研究助理，University of Ottawa",
      "job.raMotion.body": "构建骨骼运动与人体可穿戴设备相关的数据分析和可视化工具。",
      "job.microsemi.date": "2019 年 9 月 - 2019 年 12 月",
      "job.microsemi.title": "软件工程师，Microsemi Corporation",
      "job.microsemi.body": "在时间同步团队进行固件开发与测试。",
      "job.orbcomm.date": "2019 年 1 月 - 2019 年 4 月",
      "job.orbcomm.title": "硬件自动化工程师，ORBCOMM",
      "job.orbcomm.body": "开发多线程、多进程硬件自动化测试，覆盖电源、温控箱、天线、万用表、频谱分析仪和桌面电压可视化工具。",
      "job.raCommunity.date": "2018 年 5 月 - 2018 年 8 月",
      "job.raCommunity.title": "研究助理，University of Ottawa",
      "job.raCommunity.body": "重实现社区发现算法，并使用多线程、多进程技术优化运行时间。",
      "skills.kicker": "技能",
      "skills.title": "技术方向",
      "education.kicker": "教育",
      "education.title": "教育经历",
      "education.master": "计算机科学硕士，人工智能方向，2021 - 2023",
      "education.bachelor": "计算机科学本科，2016 - 2020",
      "research.kicker": "研究",
      "research.title": "发表内容",
      "research.pub1": "Convolutional Neural Networks in Multi-Class Classification of Medical Data",
      "research.pub2": "Explainable Multi-class Classification of Medical Data",
      "research.pub3": "Explainable Multi-class Classification of the CAMH COVID-19 Mental Health Data",
      "research.honor": "荣誉",
      "research.award": "Merit scholarship",
      "blog.kicker": "写作",
      "blog.note": "笔记",
      "blog.title": "博客",
      "blog.subtitle": "记录软件开发、AI 工具、系统设计，以及把小工具做出来的过程。",
      "blog.latest": "最新",
      "blog.posts": "文章",
      "blog.statPosts": "文章",
      "blog.statTopics": "主题",
      "blog.search": "搜索",
      "blog.searchPlaceholder": "搜索标题、标签或摘要",
      "blog.emptyTitle": "没有找到文章",
      "blog.emptyBody": "换一个关键词或主题试试。",
      "post.back": "← 返回博客",
      "post.related": "继续阅读",
      "notFound.title": "页面不存在",
      "notFound.body": "这个链接没有对应的页面或文章。",
      "notFound.action": "返回简历"
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function t(key) {
    return translations[state.lang][key] || translations.en[key] || key;
  }

  function localized(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[state.lang] || value.en || Object.values(value)[0];
    }
    return value;
  }

  function setText(selector, value) {
    const element = $(selector);
    if (element) {
      element.textContent = value;
    }
  }

  function formatDate(value) {
    const locale = state.lang === "zh" ? "zh-CN" : "en-CA";
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: state.lang === "zh" ? "long" : "short",
      day: "numeric"
    }).format(new Date(`${value}T00:00:00`));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderTag(tag) {
    return `<span class="tag">${escapeHtml(tag)}</span>`;
  }

  function postUrl(post) {
    return `post.html?id=${encodeURIComponent(post.id)}`;
  }

  function postTags(post) {
    return localized(post.tags) || [];
  }

  function renderPostCard(post, featured) {
    const className = featured ? "post-card post-card-featured" : "post-card";
    return `
      <article class="${className}">
        <div class="card-meta">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          <span>${escapeHtml(localized(post.readTime))}</span>
        </div>
        <h3><a href="${postUrl(post)}">${escapeHtml(localized(post.title))}</a></h3>
        <p>${escapeHtml(localized(post.excerpt))}</p>
        <div class="card-tags">${postTags(post).map(renderTag).join("")}</div>
      </article>
    `;
  }

  function getAllTags() {
    return ["All", ...new Set(posts.flatMap((post) => postTags(post)))];
  }

  function postMatches(post) {
    const query = state.query.trim().toLowerCase();
    const tags = postTags(post);
    const matchesTag = state.tag === "All" || tags.includes(state.tag);
    const haystack = [localized(post.title), localized(post.excerpt), post.date, ...tags].join(" ").toLowerCase();
    return matchesTag && (!query || haystack.includes(query));
  }

  function renderFilters() {
    const filter = $("#tag-filter");
    if (!filter) {
      return;
    }

    filter.innerHTML = getAllTags()
      .map((tag) => {
        const label = tag === "All" && state.lang === "zh" ? "全部" : tag;
        const active = tag === state.tag ? "true" : "false";
        return `<button class="filter-button" type="button" data-tag="${escapeHtml(tag)}" aria-pressed="${active}">${escapeHtml(label)}</button>`;
      })
      .join("");
  }

  function renderPostList() {
    const list = $("#post-list");
    if (!list) {
      return;
    }

    const visiblePosts = posts.filter(postMatches);
    if (!visiblePosts.length) {
      list.innerHTML = `
        <div class="empty-state">
          <h3>${escapeHtml(t("blog.emptyTitle"))}</h3>
          <p>${escapeHtml(t("blog.emptyBody"))}</p>
        </div>
      `;
      return;
    }

    list.innerHTML = visiblePosts.map((post, index) => renderPostCard(post, index === 0)).join("");
  }

  function initBlog() {
    setText("#post-count", posts.length);
    setText("#tag-count", getAllTags().length - 1);

    const searchInput = $("#search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        state.query = event.target.value;
        renderPostList();
      });
    }

    const filter = $("#tag-filter");
    if (filter) {
      filter.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-tag]");
        if (!button) {
          return;
        }
        state.tag = button.dataset.tag;
        renderFilters();
        renderPostList();
      });
    }

    renderFilters();
    renderPostList();
  }

  function findPost() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || window.location.hash.replace("#", "");
    return posts.find((post) => post.id === id) || posts[0];
  }

  function renderRelated(currentPost) {
    const related = $("#related-posts");
    if (!related) {
      return;
    }

    const currentTags = postTags(currentPost);
    const items = posts
      .filter((post) => post.id !== currentPost.id)
      .sort((a, b) => {
        const aScore = postTags(a).filter((tag) => currentTags.includes(tag)).length;
        const bScore = postTags(b).filter((tag) => currentTags.includes(tag)).length;
        return bScore - aScore || new Date(b.date) - new Date(a.date);
      })
      .slice(0, 2);

    related.innerHTML = items.map((post) => renderPostCard(post, false)).join("");
  }

  function initPost() {
    const post = findPost();
    document.title = `${localized(post.title)} - ${blog.site.title || "Yuanzheng Hu"}`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", localized(post.excerpt));
    }

    setText("#post-title", localized(post.title));
    setText("#post-excerpt", localized(post.excerpt));
    setText("#post-meta", `${formatDate(post.date)} / ${localized(post.readTime)}`);

    const tags = $("#post-tags");
    if (tags) {
      tags.innerHTML = postTags(post).map(renderTag).join("");
    }

    const content = $("#post-content");
    if (content) {
      content.innerHTML = localized(post.content);
    }

    renderRelated(post);
  }

  function updateDocumentTitle() {
    if (page === "blog") {
      document.title = `${t("blog.title")} - Yuanzheng Hu`;
    } else if (page === "resume") {
      document.title = "Yuanzheng Hu";
    } else if (page === "post") {
      initPost();
    }
  }

  function updateThemeLabel() {
    const button = $("#theme-toggle");
    if (!button) {
      return;
    }
    const theme = document.documentElement.dataset.theme || "light";
    button.textContent = theme === "dark" ? t("theme.light") : t("theme.dark");
  }

  function applyStaticTranslations() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    $$("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    $$("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
    });
    $$("[data-lang-option]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.langOption === state.lang));
    });
    updateDocumentTitle();
    updateThemeLabel();
  }

  function initLanguage() {
    const switcher = $("#language-switch");
    if (!switcher) {
      applyStaticTranslations();
      return;
    }

    switcher.addEventListener("click", (event) => {
      const button = event.target.closest("[data-lang-option]");
      if (!button) {
        return;
      }
      state.lang = button.dataset.langOption === "zh" ? "zh" : "en";
      state.tag = "All";
      localStorage.setItem("site-lang", state.lang);
      applyStaticTranslations();
      if (page === "blog") {
        renderFilters();
        renderPostList();
      }
      if (page === "post") {
        initPost();
      }
    });

    applyStaticTranslations();
  }

  function initTheme() {
    const button = $("#theme-toggle");
    const saved = localStorage.getItem("blog-theme");
    const initialTheme = saved === "dark" || saved === "light" ? saved : "light";

    function applyTheme(theme) {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("blog-theme", theme);
      updateThemeLabel();
    }

    applyTheme(initialTheme);

    if (button) {
      button.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    }
  }

  function init() {
    initLanguage();
    initTheme();
    setText("#footer-year", new Date().getFullYear());

    if (page === "blog") {
      initBlog();
    }

    if (page === "post") {
      initPost();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
