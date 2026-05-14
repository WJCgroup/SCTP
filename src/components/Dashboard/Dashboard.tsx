import type { Position, MockPrice, DCAEntry } from '../../types'
import { LAYERS } from '../../data/portfolio'
import {
  totalPortfolioValue,
  totalPortfolioPnL,
  fmtUSD,
  fmtPct,
} from '../../utils/calculations'
import LayerCard from './LayerCard'

interface Props {
  positions: Position[]
  prices: Record<string, MockPrice>
  entries: DCAEntry[]
}

export default function Dashboard({ positions, prices, entries }: Props) {
  const totalValue = totalPortfolioValue(positions, prices)
  const pnl = totalPortfolioPnL(positions, prices)
  const hasPositions = positions.some((p) => p.shares > 0)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Summary strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Total Value</p>
          <p className="text-2xl font-bold text-white mt-1">{fmtUSD(totalValue)}</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Unrealised P&amp;L</p>
          <p className={`text-2xl font-bold mt-1 ${pnl.dollar >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {pnl.dollar >= 0 ? '+' : '-'}{fmtUSD(pnl.dollar)}
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Return %</p>
          <p className={`text-2xl font-bold mt-1 ${pnl.pct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {fmtPct(pnl.pct)}
          </p>
        </div>
      </div>

      {!hasPositions && (
        <div className="bg-gray-900 border border-dashed border-gray-700 rounded-xl p-10 text-center">
          <p className="text-gray-400 font-medium">No positions yet</p>
          <p className="text-gray-600 text-sm mt-1">Go to the Holdings tab to add your first position.</p>
        </div>
      )}

      {/* Layer grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {LAYERS.map((layer) => (
          <LayerCard
            key={layer.id}
            layer={layer}
            positions={positions}
            prices={prices}
            totalValue={totalValue}
            entries={entries}
          />
        ))}
      </div>
    </div>
  )
}
