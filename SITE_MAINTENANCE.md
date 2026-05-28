# Chanda666 Personal Website Maintenance Guide

This repository uses topic-based module pages for `Learning` and `Thoughts`.

## Topic Directories

Learning:

```text
content/learning/math/       -> 数理基础 / Mathematical Foundations
content/learning/computer/   -> 计算机基础 / Computer Science Foundations
content/learning/papers/     -> 论文学习 / Paper Reading
content/learning/others/     -> 其他 / Others
```

Thoughts:

```text
content/thoughts/music/      -> 音乐分享 / Music Sharing
content/thoughts/film/       -> 影视分享 / Film & TV Sharing
content/thoughts/random/     -> 碎碎念 / Random Thoughts
content/thoughts/yearly/     -> 年度纪念 / Yearly Memories
```

Chinese-specific Markdown can be placed in the same structure under `content_zh/`.
If a localized Markdown file is missing, the site falls back to `content/`.

## Add a New Module

### 1. Write Markdown Content

Create a `.md` file in the matching topic folder:

```text
content/learning/computer/操作系统.md
content/thoughts/random/概率统计.md
```

The folder determines the topic. You do not need to repeat the topic in frontmatter.

### 2. Optional Frontmatter

Markdown files are discovered automatically. Frontmatter is optional, but useful when you want a clean card title and summary:

```toml
---
id = "operating-system"
title = "操作系统"
subtitle = "记录进程、线程、内存管理、文件系统等核心知识。"
keywords = ["Process", "Thread", "Memory", "File System"]
links = [
  { title = "进程与线程" },
  { title = "虚拟内存" },
  { title = "文件系统" },
]
---
```

If no frontmatter is provided, the file name is used as the card title and URL id.

### 3. Optional TOML Registration

Use `content/learning.toml` or `content/thoughts.toml` only when you want to manually control card metadata.
The `source` path must include the topic folder:

```toml
[[modules]]
id = "operating-system"
title = "操作系统"
subtitle = "记录进程、线程、内存管理、文件系统等核心知识。"
keywords = ["Process", "Thread", "Memory", "File System"]
source = "learning/computer/操作系统.md"
links = [
  { title = "进程与线程" },
  { title = "虚拟内存" },
  { title = "文件系统" },
]
```

For i18n, mirror the same registration in `content_zh/learning.toml` or `content_zh/thoughts.toml` if the metadata should differ by language.

## Preview and Publish

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
| `id` | No | URL identifier. Use English and hyphens, such as `operating-system`. Defaults to file name. |
| `title` | No | Card title. Defaults to file name. |
| `subtitle` | No | One-sentence summary shown below the title. |
| `keywords` | No | Tag array shown at the bottom of the card. |
| `source` | TOML only | Markdown file path, such as `learning/computer/os.md`. |
| `links` | No | Entry list shown in the middle of the card. |

## Project-Specific Rule

For this personal website, `Learning` and `Thoughts` should be maintained through topic folders first. TOML registration is optional metadata, not required for every Markdown file.
