import { useState, useEffect } from 'react'
import type { Position, MockPrice } from '../../types'
import { TICKER_TO_LAYER, ALL_TICKERS } from '../../data/portfolio'

interface Props {
  initial: Position | null
  prices: Record<string, MockPrice>
  onSave: (pos: Position) => void
  onClose: () => void
}

export default function EditPositionModal({ initial, prices, onSave, onClose }: Props) {
  const [symbol, setSymbol] = useState(initial?.symbol ?? ALL_TICKERS[0])
  const [shares, setShares] = useState(initial?.shares.toString() ?? '')
  const [avgCost, setAvgCost] = useState(initial?.avgCost.toString() ?? '')

  useEffect(() => {
    if (!initial) {
      setAvgCost(prices[symbol]?.price.toString() ?? '')
    }
  }, [symbol, initial, prices])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const s = parseFloat(shares)
    const c = parseFloat(avgCost)
    if (isNaN(s) || isNaN(c) || s < 0 || c < 0) return
    onSave({ symbol, shares: s, avgCost: c })
    onClose()
  }

  const layer = TICKER_TO_LAYER[symbol]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <h2 className="text-lg font-semibold text-white mb-5">
          {initial ? 'Edit Position' : 'Add Position'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Ticker</label>
            {initial ? (
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{symbol}</span>
                {layer && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: layer.color + '30', color: layer.color }}
                  >
                    {layer.label}
                  </span>
                )}
              </div>
            ) : (
              <select
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {ALL_TICKERS.map((t) => (
                  <option key={t} value={t}>
                    {t} — {TICKER_TO_LAYER[t]?.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Shares</label>
            <input
              type="number"
              min="0"
              step="any"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="0.00"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Avg Cost / Share ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              value={avgCost}
              onChange={(e) => setAvgCost(e.target.value)}
              placeholder="0.00"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
              required
            />
            {prices[symbol] && (
              <p className="text-xs text-gray-600 mt-1">
                Current mock price: ${prices[symbol].price.toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-700 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
