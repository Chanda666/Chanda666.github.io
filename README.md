# Chanda666.github.io

Personal homepage source for <https://chanda666.github.io/>.

## Local maintenance

```bash
npm install
npm run dev
```

Edit content in:

- `content/config.toml`: site profile and navigation
- `content/bio.md`: homepage introduction
- `content/learning/*.md`: learning articles
- `content/thoughts/*.md`: diary-style thought articles
- `content_zh/`: Chinese versions
- `public/files/`: PDFs and downloadable files
- `public/images/`: images

## Add a Learning or Thoughts article

Create a new `.md` file under `content/learning/` or `content/thoughts/`.

Example:

```md
---
title = "My Paper Note"
date = "2026-05-25"
summary = "One sentence summary."
tags = ["paper", "reading"]
link = "https://example.com"
image = "/images/example.jpg"
---

Write the article body here with Markdown.

[PDF notes](/files/course-notes.pdf)
```

Only `title` is required. `date`, `summary`, `tags`, `link`, and `image` are optional.

After editing:

```bash
git add .
git commit -m "update site"
git push
```

GitHub Actions deploys the site to GitHub Pages automatically after each push to `main`.
