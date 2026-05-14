import type { MockPrice } from '../types'

// Mock prices as of mid-May 2026.
// To replace with live data, swap this map with a fetch from your preferred API
// (e.g. Finnhub /quote, Yahoo Finance, Polygon.io) and re-export the same shape.
const mockPrices: MockPrice[] = [
  // FOUNDATION
  { symbol: 'VOO', price: 548.32, change: 3.21, changePct: 0.59 },
  { symbol: 'SPY', price: 562.18, change: 3.45, changePct: 0.62 },
  // RAILS
  { symbol: 'XRP', price: 2.84, change: 0.07, changePct: 2.53 },
  { symbol: 'COIN', price: 218.45, change: -4.32, changePct: -1.94 },
  { symbol: 'V', price: 281.60, change: 1.15, changePct: 0.41 },
  { symbol: 'MA', price: 472.90, change: 2.38, changePct: 0.51 },
  { symbol: 'LINK', price: 18.72, change: 0.54, changePct: 2.97 },
  // PLUMBING
  { symbol: 'JPM', price: 234.15, change: 0.89, changePct: 0.38 },
  { symbol: 'BLK', price: 982.40, change: 5.60, changePct: 0.57 },
  { symbol: 'CME', price: 231.80, change: -0.55, changePct: -0.24 },
  // AI POWER
  { symbol: 'NVDA', price: 1024.50, change: 18.30, changePct: 1.82 },
  { symbol: 'MU', price: 118.65, change: 2.10, changePct: 1.80 },
  { symbol: 'BE', price: 24.38, change: -0.42, changePct: -1.69 },
  // AI SOFTWARE
  { symbol: 'PLTR', price: 38.92, change: 0.87, changePct: 2.29 },
  { symbol: 'CRWD', price: 312.75, change: 4.20, changePct: 1.36 },
  { symbol: 'MSFT', price: 418.30, change: 2.95, changePct: 0.71 },
  // SPECULATIVE
  { symbol: 'SNDK', price: 67.45, change: 1.23, changePct: 1.86 },
  { symbol: 'STX', price: 102.80, change: -1.15, changePct: -1.11 },
]

export const PRICES: Record<string, MockPrice> = {}
for (const p of mockPrices) {
  PRICES[p.symbol] = p
}
