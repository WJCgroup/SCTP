import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { Position, MockPrice } from '../../types'
import { LAYERS } from '../../data/portfolio'
import { layerValue, allocationPct, totalPortfolioValue, fmtUSD, fmt } from '../../utils/calculations'

interface Props {
  positions: Position[]
  prices: Record<string, MockPrice>
}

export default function AllocationPieChart({ positions, prices }: Props) {
  const total = totalPortfolioValue(positions, prices)

  const data = LAYERS.map((layer) => {
    const value = layerValue(layer.tickers, positions, prices)
    return { name: layer.label, value, color: layer.color, pct: allocationPct(value, total) }
  }).filter((d) => d.value > 0)

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600 text-sm">
        Add holdings to see allocation
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          innerRadius={55}
          paddingAngle={2}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
          labelStyle={{ color: '#e5e7eb' }}
          formatter={(value: number, name: string) => [
            `${fmtUSD(value)} (${fmt(allocationPct(value, total))}%)`,
            name,
          ]}
        />
        <Legend
          formatter={(value) => <span style={{ color: '#9ca3af', fontSize: 12 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
