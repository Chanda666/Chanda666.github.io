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
- `content/learning.toml`: learning entries
- `content/thoughts.toml`: diary-style thought entries
- `content_zh/`: Chinese versions
- `public/files/`: PDFs and downloadable files
- `public/images/`: images

After editing:

```bash
git add .
git commit -m "update site"
git push
```

GitHub Actions deploys the site to GitHub Pages automatically after each push to `main`.
