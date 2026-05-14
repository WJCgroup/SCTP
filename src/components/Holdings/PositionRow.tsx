import type { Position, MockPrice } from '../../types'
import { TICKER_TO_LAYER } from '../../data/portfolio'
import { marketValue, unrealisedPnL, fmtUSD, fmtPct, fmt } from '../../utils/calculations'

interface Props {
  pos: Position
  prices: Record<string, MockPrice>
  onEdit: () => void
  onDelete: () => void
}

export default function PositionRow({ pos, prices, onEdit, onDelete }: Props) {
  const price = prices[pos.symbol]
  const mv = marketValue(pos, prices)
  const pnl = unrealisedPnL(pos, prices)
  const layer = TICKER_TO_LAYER[pos.symbol]
  const isPositive = pnl.dollar >= 0

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: layer?.color }}
          />
          <span className="font-medium text-white">{pos.symbol}</span>
        </div>
        <div className="text-xs text-gray-500 mt-0.5 pl-4">{layer?.label}</div>
      </td>
      <td className="py-3 px-4 text-right text-gray-300 text-sm">{fmt(pos.shares, 4)}</td>
      <td className="py-3 px-4 text-right text-gray-300 text-sm">{fmtUSD(pos.avgCost)}</td>
      <td className="py-3 px-4 text-right text-gray-300 text-sm">
        {price ? fmtUSD(price.price) : '—'}
        {price && (
          <div className={`text-xs ${price.changePct >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {fmtPct(price.changePct)}
          </div>
        )}
      </td>
      <td className="py-3 px-4 text-right text-white font-medium text-sm">{fmtUSD(mv)}</td>
      <td className="py-3 px-4 text-right text-sm">
        <span className={isPositive ? 'text-emerald-400' : 'text-red-400'}>
          {isPositive ? '+' : '-'}{fmtUSD(pnl.dollar)}
        </span>
        <div className={`text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
          {fmtPct(pnl.pct)}
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={onEdit}
            className="text-xs px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-xs px-3 py-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-400 transition-colors"
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  )
}
