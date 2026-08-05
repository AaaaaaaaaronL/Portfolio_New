# Aaron Portfolio

English single-page portfolio with a desk intro experience.

## Quick start

```bash
npm install
npm run sync:resumes
npm run dev
```

## Edit content (no code diving)

Everything editable lives in **`content/`**:

| Path | What to change |
|------|----------------|
| `content/site.ts` | Name, copy, experience, projects, skills, links… |
| `content/resumes/*.pdf` | Resume PDFs |
| `content/README.md` | Short editing notes |

After replacing PDFs, run:

```bash
npm run sync:resumes
```

## Reminder

- Add WhatsApp later: set `social.whatsapp` in `content/site.ts`
- Optional WakaTime embed: set `wakatime.embedSrc` to your public share image URL

## Build

```bash
npm run build
npm run preview
```

## Deploy on GitHub Pages (free)

This repo deploys automatically with GitHub Actions on every push to `main`.

**Site URL:** https://aaaaaaaaaronl.github.io/Portfolio_New/

### One-time setup in GitHub

1. Open the repo → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**
3. Push to `main` (or run the **Deploy GitHub Pages** workflow manually)

### Notes

- GitHub Pages is free for public repos (soft limits such as ~1GB site size / ~100GB bandwidth per month; plenty for a portfolio). See [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
- Using a custom Actions workflow avoids the older “10 builds/hour” Jekyll pipeline limit.
- All commit messages in this project should be written in **English**.
