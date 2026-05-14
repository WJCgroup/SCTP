import type { Layer } from '../types'

export const LAYERS: Layer[] = [
  {
    id: 'FOUNDATION',
    label: 'Foundation',
    color: '#3b82f6',
    tickers: ['VOO', 'SPY'],
  },
  {
    id: 'RAILS',
    label: 'Rails',
    color: '#8b5cf6',
    tickers: ['XRP', 'COIN', 'V', 'MA', 'LINK'],
  },
  {
    id: 'PLUMBING',
    label: 'Plumbing',
    color: '#06b6d4',
    tickers: ['JPM', 'BLK', 'CME'],
  },
  {
    id: 'AI_POWER',
    label: 'AI Power',
    color: '#f59e0b',
    tickers: ['NVDA', 'MU', 'BE'],
  },
  {
    id: 'AI_SOFTWARE',
    label: 'AI Software',
    color: '#10b981',
    tickers: ['PLTR', 'CRWD', 'MSFT'],
  },
  {
    id: 'SPECULATIVE',
    label: 'Speculative',
    color: '#ef4444',
    tickers: ['SNDK', 'STX'],
  },
]

export const TICKER_TO_LAYER: Record<string, Layer> = {}
for (const layer of LAYERS) {
  for (const ticker of layer.tickers) {
    TICKER_TO_LAYER[ticker] = layer
  }
}

export const ALL_TICKERS = LAYERS.flatMap((l) => l.tickers)
