(function () {
  const blog = window.BLOG || { site: {}, posts: [] };
  const posts = [...blog.posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const page = document.body.dataset.page;
  const state = {
    tag: "All",
    query: ""
  };

  const $ = (selector, root = document) => root.querySelector(selector);

  function setText(selector, value) {
    const element = $(selector);
    if (element) {
      element.textContent = value;
    }
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "short",
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

  function renderPostCard(post, featured) {
    const className = featured ? "post-card post-card-featured" : "post-card";
    return `
      <article class="${className}">
        <div class="card-meta">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          <span>${escapeHtml(post.readTime)}</span>
        </div>
        <h3><a href="${postUrl(post)}">${escapeHtml(post.title)}</a></h3>
        <p>${escapeHtml(post.excerpt)}</p>
        <div class="card-tags">${post.tags.map(renderTag).join("")}</div>
      </article>
    `;
  }

  function getAllTags() {
    return ["All", ...new Set(posts.flatMap((post) => post.tags))];
  }

  function postMatches(post) {
    const query = state.query.trim().toLowerCase();
    const matchesTag = state.tag === "All" || post.tags.includes(state.tag);
    const haystack = [post.title, post.excerpt, post.date, ...post.tags].join(" ").toLowerCase();
    return matchesTag && (!query || haystack.includes(query));
  }

  function renderFilters() {
    const filter = $("#tag-filter");
    if (!filter) {
      return;
    }

    filter.innerHTML = getAllTags()
      .map((tag) => {
        const active = tag === state.tag ? "true" : "false";
        return `<button class="filter-button" type="button" data-tag="${escapeHtml(tag)}" aria-pressed="${active}">${escapeHtml(tag)}</button>`;
      })
      .join("");

    filter.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-tag]");
      if (!button) {
        return;
      }
      state.tag = button.dataset.tag;
      renderFilters();
      renderPostList();
    }, { once: true });
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
          <h3>No posts found</h3>
          <p>Try another keyword or topic.</p>
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

    const items = posts
      .filter((post) => post.id !== currentPost.id)
      .sort((a, b) => {
        const aScore = a.tags.filter((tag) => currentPost.tags.includes(tag)).length;
        const bScore = b.tags.filter((tag) => currentPost.tags.includes(tag)).length;
        return bScore - aScore || new Date(b.date) - new Date(a.date);
      })
      .slice(0, 2);

    related.innerHTML = items.map((post) => renderPostCard(post, false)).join("");
  }

  function initPost() {
    const post = findPost();
    document.title = `${post.title} - ${blog.site.title || "Yuanzheng Hu"}`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", post.excerpt);
    }

    setText("#post-title", post.title);
    setText("#post-excerpt", post.excerpt);
    setText("#post-meta", `${formatDate(post.date)} · ${post.readTime}`);

    const tags = $("#post-tags");
    if (tags) {
      tags.innerHTML = post.tags.map(renderTag).join("");
    }

    const content = $("#post-content");
    if (content) {
      content.innerHTML = post.content;
    }

    renderRelated(post);
  }

  function initTheme() {
    const button = $("#theme-toggle");
    const saved = localStorage.getItem("blog-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = saved || (prefersDark ? "dark" : "light");

    function applyTheme(theme) {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("blog-theme", theme);
      if (button) {
        button.textContent = theme === "dark" ? "Light" : "Dark";
      }
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
