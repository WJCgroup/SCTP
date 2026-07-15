# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SCTP is a personal portfolio tracker for the "Simple Portfolio Framework": holdings are organized into 6 named layers (Foundation, Rails, Plumbing, AI Power, AI Software, Speculative), each with a fixed set of tickers. The repo contains **two independent implementations**:

1. **React app** (`src/`, built with Vite + TypeScript + Tailwind + Recharts) — the main app, uses mock prices.
2. **`portfolio.html`** — a self-contained single-file rough draft with no build step. It uses Chart.js from a CDN, fetches live prices from Yahoo Finance on load (falling back to cached prices), and duplicates the layer/ticker data inline. Changes to one implementation do not affect the other.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server
npm run build      # tsc && vite build — this is also the type check
npm run preview    # serve the production build
```

There are no tests and no linter configured. `npm run build` is the verification step: TypeScript is `strict` with `noUnusedLocals`/`noUnusedParameters`, so unused imports or variables fail the build.

`portfolio.html` needs no build — open it directly in a browser (its Yahoo Finance fetch requires network access; it falls back to hardcoded prices otherwise).

## React App Architecture

Data flows top-down from `src/App.tsx`, which owns all state and switches between four tab pages (Dashboard, Holdings, DCA, Charts). There is no router and no global state library.

- **Layer/ticker definitions**: `src/data/portfolio.ts` exports `LAYERS` (the single source of truth for layer names, colors, and which tickers belong to each layer) plus derived `TICKER_TO_LAYER` and `ALL_TICKERS` maps. To add a ticker: add it to a layer here **and** add a price entry in `src/data/prices.ts`.
- **Prices**: `src/data/prices.ts` exports a static `PRICES: Record<string, MockPrice>` map of mock prices. To go live, replace this map with an API fetch that re-exports the same shape (see the comment in that file).
- **Persistence**: two hooks wrap `localStorage` — `usePortfolio` (positions, key `sctp_positions`) and `useDCA` (DCA entries for VOO/SPY, key `sctp_dca`). Each hook loads once on mount and writes back on every mutation. All user data lives in the browser; there is no backend.
- **Calculations**: all P&L, allocation, DCA-stats, and formatting logic (`fmt`, `fmtUSD`, `fmtPct`) is in pure functions in `src/utils/calculations.ts`. Components call these rather than computing inline.
- **Types**: shared interfaces (`Position`, `DCAEntry`, `Layer`, `MockPrice`, `PnL`, `DCAStats`) live in `src/types/index.ts`.
- **Components**: `src/components/` is grouped by page (`Dashboard/`, `Holdings/`, `DCA/`, `Charts/`, plus shared `Layout/`). Pages receive positions/prices/callbacks as props from `App`.

## Conventions

- Dark theme only: `index.html` sets `class="dark"` on `<html>`, Tailwind uses `darkMode: 'class'`, and components style with `gray-900`/`gray-800` surfaces directly.
- No semicolons, single quotes, function components with default exports, props typed via a local `interface Props`.
- Amounts are formatted through the `fmt*` helpers in `calculations.ts`, never with ad-hoc `toFixed`.
