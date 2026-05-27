# Chanda666 Personal Website Maintenance Guide

This repository uses module-style pages for `Learning` and `Thoughts`.

## Add a New Module

### 1. Write Markdown Content

Create a `.md` file in the matching content directory:

```text
content/learning/操作系统.md   -> Learning module
content/thoughts/概率统计.md   -> Thoughts module
```

Write the full note content in that Markdown file.

### 2. Register the Module

Edit `content/learning.toml` or `content/thoughts.toml`, then append a `[[modules]]` block:

```toml
[[modules]]
id = "operating-system"
title = "操作系统"
subtitle = "记录进程、线程、内存管理、文件系统等核心知识。"
keywords = ["Process", "Thread", "Memory", "File System"]
source = "learning/操作系统.md"
links = [
  { title = "进程与线程" },
  { title = "虚拟内存" },
  { title = "文件系统" },
]
```

### 3. Sync Chinese Content

If i18n is enabled, copy the same `[[modules]]` block to the matching Chinese config:

```text
content_zh/learning.toml
content_zh/thoughts.toml
```

Keep `id` and `source` stable across languages unless the Markdown file path is intentionally different.

### 4. Preview and Publish

Run locally:

```bash
npm run dev
```

Build check:

```bash
npm run build
```

Publish:

```bash
git add .
git commit -m "update modules"
git push
```

GitHub Actions will deploy the site to `https://chanda666.github.io/`.

## Field Reference

| Field | Required | Description |
| --- | --- | --- |
| `id` | Yes | URL identifier. Use English and hyphens, such as `operating-system`. |
| `title` | Yes | Card title. Chinese is fine. |
| `subtitle` | No | One-sentence summary shown below the title. |
| `keywords` | No | Tag array shown at the bottom of the card. |
| `source` | Yes | Markdown file path, such as `learning/os.md`. |
| `links` | No | Entry list shown in the middle of the card. |

## Project-Specific Rule

For this personal website, `Learning` and `Thoughts` should be maintained through Markdown files plus TOML module registration. Do not return to the older flat article-list format unless explicitly requested.
