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
- `content/learning/<topic>/*.md`：按主题分类的学习模块
- `content/thoughts/<topic>/*.md`：按主题分类的想法模块
- `content_zh/`：中文版本
- `public/files/`：PDF 和可下载文件
- `public/images/`：图片

## 新增 Learning 或 Thoughts 文章

在对应主题文件夹中新建 `.md` 文件，例如 `content/learning/computer/` 或 `content/thoughts/random/`。

示例：

```md
---
id = "my-paper-note"
title = "我的论文笔记"
subtitle = "一句话摘要。"
keywords = ["论文", "阅读"]
---

这里用 Markdown 写正文。

[PDF 笔记](/files/course-notes.pdf)
```

frontmatter 是可选的。不写时，文件名会作为卡片标题和 URL 标识。

修改后发布：

```bash
git add .
git commit -m "update site"
git push
```

每次推送到 `main` 后，GitHub Actions 会自动部署到 GitHub Pages。

## 当前模块维护方式

`Learning` 和 `Thoughts` 现在使用主题文件夹维护，TOML 注册只是可选元数据。新增笔记前请看 `SITE_MAINTENANCE.md`。
