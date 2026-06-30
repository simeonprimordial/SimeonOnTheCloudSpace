# Simeon Siaka — Portfolio

Built with React + Vite + Tailwind CSS v4.

## Local development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
Output goes to `dist/`.

## Deploy
Pushing to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages automatically. No manual build/upload step needed.

To enable Pages on the repo (one-time setup):
Settings → Pages → Source → **GitHub Actions**.
