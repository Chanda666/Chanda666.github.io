# Chanda666.github.io

这是 <https://chanda666.github.io/> 的个人主页源码。

## 本地维护

```bash
npm install
npm run dev
```

主要编辑这些文件：

- `content/config.toml`：站点资料和导航
- `content/bio.md`：主页简介
- `content/learning/*.md`：学习文章
- `content/thoughts/*.md`：日记式想法文章
- `content_zh/`：中文版本
- `public/files/`：PDF 和可下载文件
- `public/images/`：图片

## 新增 Learning 或 Thoughts 文章

在 `content/learning/` 或 `content/thoughts/` 下面新建 `.md` 文件。

示例：

```md
---
title = "我的论文笔记"
date = "2026-05-25"
summary = "一句话摘要。"
tags = ["论文", "阅读"]
link = "https://example.com"
image = "/images/example.jpg"
---

这里用 Markdown 写正文。

[PDF 笔记](/files/course-notes.pdf)
```

只有 `title` 必填。`date`、`summary`、`tags`、`link`、`image` 都是可选项。

修改后发布：

```bash
git add .
git commit -m "update site"
git push
```

每次推送到 `main` 后，GitHub Actions 会自动部署到 GitHub Pages。

## 当前模块维护方式

`Learning` 和 `Thoughts` 现在使用模块注册方式维护。新增笔记前请看 `SITE_MAINTENANCE.md`。
