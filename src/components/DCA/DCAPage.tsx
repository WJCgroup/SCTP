import { useState } from 'react'
import type { DCAEntry, MockPrice } from '../../types'
import { dcaStats, fmtUSD } from '../../utils/calculations'
import DCAStats from './DCAStats'

interface Props {
  entries: DCAEntry[]
  prices: Record<string, MockPrice>
  onAdd: (entry: DCAEntry) => void
  onDelete: (id: string) => void
}

type DCASymbol = 'VOO' | 'SPY'

export default function DCAPage({ entries, prices, onAdd, onDelete }: Props) {
  const [activeSymbol, setActiveSymbol] = useState<DCASymbol>('VOO')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [shares, setShares] = useState('')
  const [price, setPrice] = useState('')

  const filtered = entries.filter((e) => e.symbol === activeSymbol)
  const stats = dcaStats(filtered)

  function handleSymbolChange(sym: DCASymbol) {
    setActiveSymbol(sym)
    setPrice(prices[sym]?.price.toString() ?? '')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const s = parseFloat(shares)
    const p = parseFloat(price)
    if (isNaN(s) || isNaN(p) || s <= 0 || p <= 0) return
    onAdd({
      id: crypto.randomUUID(),
      symbol: activeSymbol,
      date,
      shares: s,
      price: p,
    })
    setShares('')
    setPrice(prices[activeSymbol]?.price.toString() ?? '')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">DCA Tracker</h2>
        <div className="flex gap-1 bg-gray-800 p-1 rounded-lg">
          {(['VOO', 'SPY'] as DCASymbol[]).map((sym) => (
            <button
              key={sym}
              onClick={() => handleSymbolChange(sym)}
              className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${
                activeSymbol === sym
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      <DCAStats stats={stats} symbol={activeSymbol} />

      {/* Entry form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Log Weekly Buy</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 [color-scheme:dark]"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Ticker</label>
            <div className="px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-blue-400 text-sm font-medium">
              {activeSymbol}
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Shares</label>
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
            <label className="block text-xs text-gray-500 mb-1.5">Price / Share ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={prices[activeSymbol]?.price.toString() ?? '0.00'}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="sm:col-span-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              + Add Entry
            </button>
          </div>
        </form>
      </div>

      {/* Entry list */}
      {filtered.length === 0 ? (
        <div className="bg-gray-900 border border-dashed border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-500 text-sm">No {activeSymbol} entries yet. Log your first weekly buy above.</p>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-gray-500">
                <th className="py-3 px-4 text-left font-medium">Date</th>
                <th className="py-3 px-4 text-right font-medium">Shares</th>
                <th className="py-3 px-4 text-right font-medium">Price</th>
                <th className="py-3 px-4 text-right font-medium">Total</th>
                <th className="py-3 px-4 text-right font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-300">{entry.date}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-300">{entry.shares.toFixed(4)}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-300">{fmtUSD(entry.price)}</td>
                  <td className="py-3 px-4 text-sm text-right text-white font-medium">
                    {fmtUSD(entry.shares * entry.price)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="text-xs px-3 py-1 rounded-lg bg-red-950 hover:bg-red-900 text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
