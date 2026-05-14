import type { Position, MockPrice } from '../../types'
import AllocationPieChart from './AllocationPieChart'
import LayerBarChart from './LayerBarChart'

interface Props {
  positions: Position[]
  prices: Record<string, MockPrice>
}

export default function ChartsPage({ positions, prices }: Props) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-white">Charts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
            Allocation by Layer
          </h3>
          <AllocationPieChart positions={positions} prices={prices} />
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
            Value by Ticker
          </h3>
          <LayerBarChart positions={positions} prices={prices} />
        </div>
      </div>
    </div>
  )
}
