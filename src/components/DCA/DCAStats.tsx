import type { DCAStats as DCAStatsType } from '../../types'
import { fmtUSD, fmt } from '../../utils/calculations'

interface Props {
  stats: DCAStatsType
  symbol: string
}

export default function DCAStats({ stats, symbol }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[
        { label: 'Total Invested', value: fmtUSD(stats.totalInvested) },
        { label: 'Total Shares', value: fmt(stats.totalShares, 4) },
        { label: 'Avg Cost / Share', value: fmtUSD(stats.avgCost) },
        { label: `${symbol} Entries`, value: stats.entryCount.toString() },
      ].map(({ label, value }) => (
        <div key={label} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="text-xl font-bold text-white mt-1">{value}</p>
        </div>
      ))}
    </div>
  )
}
