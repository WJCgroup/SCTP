import type { Position, DCAEntry, PnL, DCAStats, MockPrice } from '../types'

export function marketValue(pos: Position, prices: Record<string, MockPrice>): number {
  return pos.shares * (prices[pos.symbol]?.price ?? 0)
}

export function costBasis(pos: Position): number {
  return pos.shares * pos.avgCost
}

export function unrealisedPnL(pos: Position, prices: Record<string, MockPrice>): PnL {
  const mv = marketValue(pos, prices)
  const cb = costBasis(pos)
  const dollar = mv - cb
  const pct = cb === 0 ? 0 : (dollar / cb) * 100
  return { dollar, pct }
}

export function totalPortfolioValue(
  positions: Position[],
  prices: Record<string, MockPrice>
): number {
  return positions.reduce((sum, pos) => sum + marketValue(pos, prices), 0)
}

export function totalPortfolioPnL(
  positions: Position[],
  prices: Record<string, MockPrice>
): PnL {
  const totalMV = positions.reduce((s, p) => s + marketValue(p, prices), 0)
  const totalCB = positions.reduce((s, p) => s + costBasis(p), 0)
  const dollar = totalMV - totalCB
  const pct = totalCB === 0 ? 0 : (dollar / totalCB) * 100
  return { dollar, pct }
}

export function layerValue(
  tickers: string[],
  positions: Position[],
  prices: Record<string, MockPrice>
): number {
  return positions
    .filter((p) => tickers.includes(p.symbol) && p.shares > 0)
    .reduce((sum, p) => sum + marketValue(p, prices), 0)
}

export function allocationPct(value: number, total: number): number {
  return total === 0 ? 0 : (value / total) * 100
}

export function dcaStats(entries: DCAEntry[]): DCAStats {
  const totalShares = entries.reduce((s, e) => s + e.shares, 0)
  const totalInvested = entries.reduce((s, e) => s + e.shares * e.price, 0)
  return {
    totalShares,
    totalInvested,
    avgCost: totalShares === 0 ? 0 : totalInvested / totalShares,
    entryCount: entries.length,
  }
}

export function fmt(n: number, decimals = 2): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function fmtUSD(n: number): string {
  return '$' + fmt(Math.abs(n))
}

export function fmtPct(n: number): string {
  return (n >= 0 ? '+' : '') + fmt(n) + '%'
}
