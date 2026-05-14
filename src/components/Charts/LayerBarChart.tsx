import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import type { Position, MockPrice } from '../../types'
import { LAYERS, TICKER_TO_LAYER } from '../../data/portfolio'
import { marketValue, fmtUSD } from '../../utils/calculations'

interface Props {
  positions: Position[]
  prices: Record<string, MockPrice>
}

export default function LayerBarChart({ positions, prices }: Props) {
  const data = LAYERS.flatMap((layer) =>
    layer.tickers
      .map((sym) => {
        const pos = positions.find((p) => p.symbol === sym)
        if (!pos || pos.shares === 0) return null
        return { symbol: sym, value: marketValue(pos, prices), color: layer.color }
      })
      .filter(Boolean)
  ) as { symbol: string; value: number; color: string }[]

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600 text-sm">
        Add holdings to see per-ticker breakdown
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 4, right: 16, left: 16, bottom: 4 }}>
        <CartesianGrid vertical={false} stroke="#1f2937" />
        <XAxis
          dataKey="symbol"
          tick={{ fill: '#9ca3af', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          tick={{ fill: '#6b7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={48}
        />
        <Tooltip
          contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
          cursor={{ fill: '#ffffff08' }}
          formatter={(value: number, _: string, props: { payload?: { symbol: string } }) => [
            fmtUSD(value),
            TICKER_TO_LAYER[props.payload?.symbol ?? '']?.label ?? '',
          ]}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
