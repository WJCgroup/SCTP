import { useState } from 'react'
import type { Position, MockPrice } from '../../types'
import { LAYERS } from '../../data/portfolio'
import PositionRow from './PositionRow'
import EditPositionModal from './EditPositionModal'

interface Props {
  positions: Position[]
  prices: Record<string, MockPrice>
  onUpsert: (pos: Position) => void
  onDelete: (symbol: string) => void
}

export default function HoldingsPage({ positions, prices, onUpsert, onDelete }: Props) {
  const [editing, setEditing] = useState<Position | null | 'new'>(null)

  const activePositions = positions.filter((p) => p.shares > 0)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Holdings</h2>
          <p className="text-sm text-gray-500 mt-0.5">{activePositions.length} positions</p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add Position
        </button>
      </div>

      {activePositions.length === 0 ? (
        <div className="bg-gray-900 border border-dashed border-gray-700 rounded-xl p-12 text-center">
          <p className="text-gray-400 font-medium">No positions yet</p>
          <p className="text-gray-600 text-sm mt-1">Click "Add Position" to get started.</p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          {LAYERS.map((layer) => {
            const layerPositions = activePositions.filter((p) =>
              layer.tickers.includes(p.symbol)
            )
            if (layerPositions.length === 0) return null
            return (
              <div key={layer.id}>
                <div
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                  style={{ color: layer.color, backgroundColor: layer.color + '12' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
                  {layer.label}
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b border-gray-800">
                      <th className="py-2 px-4 text-left font-medium">Ticker</th>
                      <th className="py-2 px-4 text-right font-medium">Shares</th>
                      <th className="py-2 px-4 text-right font-medium">Avg Cost</th>
                      <th className="py-2 px-4 text-right font-medium">Price</th>
                      <th className="py-2 px-4 text-right font-medium">Value</th>
                      <th className="py-2 px-4 text-right font-medium">P&amp;L</th>
                      <th className="py-2 px-4 text-right font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {layerPositions.map((pos) => (
                      <PositionRow
                        key={pos.symbol}
                        pos={pos}
                        prices={prices}
                        onEdit={() => setEditing(pos)}
                        onDelete={() => onDelete(pos.symbol)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
      )}

      {editing !== null && (
        <EditPositionModal
          initial={editing === 'new' ? null : editing}
          prices={prices}
          onSave={onUpsert}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
