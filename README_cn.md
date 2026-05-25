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
- `content/learning.toml`：学习记录
- `content/thoughts.toml`：日记式想法
- `content_zh/`：中文版本
- `public/files/`：PDF 和可下载文件
- `public/images/`：图片

修改后发布：

```bash
git add .
git commit -m "update site"
git push
```

每次推送到 `main` 后，GitHub Actions 会自动部署到 GitHub Pages。
