# Your Name blog

A Jekyll blog for GitHub Pages, following the same setup as [karpathy.github.io](https://github.com/karpathy/karpathy.github.io).

## Structure

```
yourusername.github.io/
├── _config.yml          ← Site title, URL, social handles
├── _layouts/
│   ├── default.html     ← Header + footer on every page
│   └── post.html        ← Individual post template
├── _posts/              ← ✏️ Write your posts here (Markdown)
│   └── YYYY-MM-DD-title.md
├── assets/
│   └── rssicon.svg
├── css/
│   └── main.css         ← All styling (edit to customize)
├── about.md             ← Your about page
├── index.html           ← Auto-generates post list
├── feed.xml             ← RSS feed (via jekyll-feed plugin)
└── Gemfile              ← For local development only
```

## Deploy to GitHub Pages

```bash
# 1. Create repo named exactly:  yourusername.github.io
# 2. Push files
git init
git add .
git commit -m "initial commit"
git remote add origin git@github.com:yourusername/yourusername.github.io.git
git push -u origin main

# 3. Settings → Pages → Deploy from branch (main) → Save
# Live at https://yourusername.github.io in ~1 min
```

## Writing a post

Create a file in `_posts/` named `YYYY-MM-DD-slug.md`:

```markdown
---
layout: post
title:  "Your Post Title"
date:   2025-02-15
tags:   [Engineering, Backend]
---

Your content here in Markdown.

## A section heading

Normal paragraph. **Bold**, *italic*, `inline code`.

    ```python
    def hello():
        print("hello world")
    ```
```

Push to GitHub → Jekyll builds it automatically. That's it.

## Local development

```bash
gem install bundler
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

## Customize

- **Site name / description / social links** → `_config.yml`
- **Styling** → `css/main.css` (Georgia serif, 650px wide, plain)
- **About page** → `about.md`
- **Header / footer** → `_layouts/default.html`
