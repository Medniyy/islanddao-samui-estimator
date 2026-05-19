# IslandDAO Samui — Trip Cost Estimator

Single-page tool to estimate the cost of attending **IslandDAO Thailand** (Koh Samui, June 2026): flights, Bangkok–Samui transfer, accommodation, food, and extras.

- **Live site:** [https://medniyy.github.io/islanddao-samui-estimator/](https://medniyy.github.io/islanddao-samui-estimator/) (after GitHub Pages is enabled)
- **Free to run** — static site, no API keys
- **Client-side only** — all math in the browser

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

For a local preview of the production build:

```bash
npm run preview
```

## Deploy (GitHub Pages)

Pushes to `main` deploy automatically via [GitHub Actions](.github/workflows/deploy.yml).

**One-time setup on GitHub:**

1. Create a new repository: [github.com/new](https://github.com/new)  
   Name it **`islanddao-samui-estimator`** (must match the URL path).
2. Push this project to `main` (see commands below).
3. Open **Settings → Pages** → Source: **GitHub Actions**.

Your site will be at:

**https://medniyy.github.io/islanddao-samui-estimator/**

## Update prices

Edit [`src/data/samui-prices.json`](src/data/samui-prices.json) or use prompts in [`docs/RESEARCH_PROMPTS.md`](docs/RESEARCH_PROMPTS.md).

## Disclaimers

All figures are **estimates** from public averages, not live quotes. Margin-of-error ranges are illustrative. Not financial advice.

## Links

- [IslandDAO Events](https://islanddao.org/events)
- [IslandDAO V4 Registration](https://v4.islanddao.org/)
- [Nomadz Stays](https://nomadz.xyz/stays)
- [ATH](https://ath.camera/)

Made by [ATH](https://ath.camera/) · [GitHub @Medniyy](https://github.com/Medniyy)
