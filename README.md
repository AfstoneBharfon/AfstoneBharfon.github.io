# dev.journal — GitHub Pages Blog

An elegant, editorial-style blog template built for GitHub Pages. No frameworks, no build tools — just HTML, CSS, and a little JavaScript.

---

## 🚀 Quick Setup

### 1. Create a GitHub repository

Name it `yourusername.github.io` — this becomes your blog's URL automatically.

```
https://yourusername.github.io
```

### 2. Upload these files

Push all files in this folder to the **root** of your repository:

```
/
├── index.html        ← Homepage (post listing)
├── about.html        ← About / bio page
├── post.html         ← Sample blog post template
├── assets/
│   ├── css/style.css
│   └── js/main.js
└── README.md
```

### 3. Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under *Build and deployment*, set Source to **Deploy from a branch**
3. Set Branch to `main` (or `master`), folder `/root`
4. Click **Save**

Your site will be live within ~1 minute at `https://yourusername.github.io`.

---

## ✏️ Customizing

### Update your personal info

Open each HTML file and replace the placeholders:

| Placeholder | Replace with |
|---|---|
| `yourusername` | Your GitHub/Twitter/LinkedIn username |
| `Your Name` | Your actual name |
| `YN` | Your initials (for the avatar) |
| `you@example.com` | Your email |
| `Senior Software Engineer` | Your title/role |

### Add a new blog post

1. Duplicate `post.html`
2. Rename it something descriptive, e.g. `why-i-love-go.html`
3. Update the title, tags, date, and body content
4. Add a new `<article>` card to `index.html` pointing to your new file

### Add a new post card to index.html

```html
<article class="post-card" data-tags="backend performance">
  <div class="post-card-inner">
    <div class="post-meta">
      <span class="post-date">Feb 15, 2025</span>
      <span class="post-tag">Backend</span>
    </div>
    <h2 class="post-title">
      <a href="your-post-filename.html">Your Post Title</a>
    </h2>
    <p class="post-excerpt">A short description of what the post is about.</p>
    <div class="post-footer">
      <span class="read-time">5 min read</span>
      <a href="your-post-filename.html" class="read-link">Read essay →</a>
    </div>
  </div>
</article>
```

### Update tags

The tag filter buttons live in `index.html` inside `.tag-filter-bar`. Add or change tags to match your writing topics.

---

## 🎨 Customization Tips

- **Colors**: All colors are CSS variables at the top of `style.css` — change `--accent` to any color for your brand
- **Fonts**: Swap the Google Fonts imports in the `<head>` of each HTML file
- **Avatar**: Replace the initials `<div>` with an `<img>` tag pointing to a photo

---

## 📦 No Build Required

This template uses zero npm packages, zero bundlers, zero config files. To develop locally, just open `index.html` in your browser — or run a simple server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

Built with ♥ for developers who value craft.
