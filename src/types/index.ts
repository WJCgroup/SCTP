export type LayerName =
  | 'FOUNDATION'
  | 'RAILS'
  | 'PLUMBING'
  | 'AI_POWER'
  | 'AI_SOFTWARE'
  | 'SPECULATIVE'

export interface Layer {
  id: LayerName
  label: string
  color: string
  tickers: string[]
}

export interface MockPrice {
  symbol: string
  price: number
  change: number
  changePct: number
}

export interface Position {
  symbol: string
  shares: number
  avgCost: number
}

export interface DCAEntry {
  id: string
  symbol: 'VOO' | 'SPY'
  date: string
  shares: number
  price: number
}

export interface PnL {
  dollar: number
  pct: number
}

export interface DCAStats {
  totalShares: number
  totalInvested: number
  avgCost: number
  entryCount: number
}
