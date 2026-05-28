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
- `content/learning/<topic>/*.md`: learning modules by topic
- `content/thoughts/<topic>/*.md`: thoughts modules by topic
- `content_zh/`: Chinese versions
- `public/files/`: PDFs and downloadable files
- `public/images/`: images

## Add a Learning or Thoughts article

Create a new `.md` file under a topic folder, such as `content/learning/computer/` or `content/thoughts/random/`.

Example:

```md
---
id = "my-paper-note"
title = "My Paper Note"
subtitle = "One sentence summary."
keywords = ["paper", "reading"]
---

Write the article body here with Markdown.

[PDF notes](/files/course-notes.pdf)
```

Frontmatter is optional. If omitted, the file name is used as the card title and URL id.

After editing:

```bash
git add .
git commit -m "update site"
git push
```

GitHub Actions deploys the site to GitHub Pages automatically after each push to `main`.

## Current Module Workflow

`Learning` and `Thoughts` now use topic folders with optional module registration. See `SITE_MAINTENANCE.md` before adding new notes.
