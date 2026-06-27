# Yuanzheng Hu

Personal resume homepage and lightweight blog for GitHub Pages.

## Structure

- `index.html`: resume homepage
- `blog.html`: blog listing tab
- `post.html`: blog post detail page
- `assets/js/posts.js`: editable blog post data
- `assets/css/styles.css`: site styles

## Local Preview

```powershell
python -m http.server 8080
```

Then open:

```text
http://127.0.0.1:8080/
```

## Add a Blog Post

Edit `assets/js/posts.js` and add an item to the `posts` array:

```js
{
  id: "my-new-post",
  title: "New post title",
  date: "2026-06-26",
  readTime: "3 min",
  tags: ["Engineering"],
  excerpt: "Short summary.",
  content: `
    <p>Post body.</p>
  `
}
```

The post URL will be:

```text
post.html?id=my-new-post
```
