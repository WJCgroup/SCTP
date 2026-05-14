import type { Layer, Position, MockPrice, DCAEntry } from '../../types'
import {
  marketValue,
  unrealisedPnL,
  layerValue,
  allocationPct,
  fmtUSD,
  fmtPct,
  fmt,
} from '../../utils/calculations'

interface Props {
  layer: Layer
  positions: Position[]
  prices: Record<string, MockPrice>
  totalValue: number
  entries: DCAEntry[]
}

export default function LayerCard({ layer, positions, prices, totalValue }: Props) {
  const lv = layerValue(layer.tickers, positions, prices)
  const alloc = allocationPct(lv, totalValue)

  const heldPositions = positions.filter(
    (p) => layer.tickers.includes(p.symbol) && p.shares > 0
  )

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: layer.color }}
          />
          <span className="font-semibold text-white">{layer.label}</span>
        </div>
        <span className="text-sm font-medium text-gray-400">{fmt(alloc)}%</span>
      </div>

      {/* Allocation bar */}
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(alloc, 100)}%`, backgroundColor: layer.color }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Layer value</span>
        <span className="font-medium text-white">{fmtUSD(lv)}</span>
      </div>

      {heldPositions.length === 0 ? (
        <p className="text-xs text-gray-600 text-center py-2">No positions yet</p>
      ) : (
        <div className="space-y-2">
          {layer.tickers.map((sym) => {
            const pos = positions.find((p) => p.symbol === sym)
            if (!pos || pos.shares === 0) return null
            const mv = marketValue(pos, prices)
            const pnl = unrealisedPnL(pos, prices)
            return (
              <div key={sym} className="flex items-center justify-between text-xs">
                <span className="text-gray-300 font-medium w-12">{sym}</span>
                <span className="text-gray-400">{fmtUSD(mv)}</span>
                <span className={pnl.dollar >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                  {fmtPct(pnl.pct)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
