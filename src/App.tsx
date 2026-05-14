import { useState } from 'react'
import Header from './components/Layout/Header'
import TabNav, { type TabId } from './components/Layout/TabNav'
import Dashboard from './components/Dashboard/Dashboard'
import HoldingsPage from './components/Holdings/HoldingsPage'
import DCAPage from './components/DCA/DCAPage'
import ChartsPage from './components/Charts/ChartsPage'
import { usePortfolio } from './hooks/usePortfolio'
import { useDCA } from './hooks/useDCA'
import { PRICES } from './data/prices'

export default function App() {
  const [tab, setTab] = useState<TabId>('dashboard')
  const { positions, upsertPosition, deletePosition } = usePortfolio()
  const { entries, addEntry, deleteEntry } = useDCA()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TabNav active={tab} onChange={setTab} />
      <main className="flex-1 overflow-auto p-6">
        {tab === 'dashboard' && (
          <Dashboard positions={positions} prices={PRICES} entries={entries} />
        )}
        {tab === 'holdings' && (
          <HoldingsPage
            positions={positions}
            prices={PRICES}
            onUpsert={upsertPosition}
            onDelete={deletePosition}
          />
        )}
        {tab === 'dca' && (
          <DCAPage entries={entries} onAdd={addEntry} onDelete={deleteEntry} prices={PRICES} />
        )}
        {tab === 'charts' && (
          <ChartsPage positions={positions} prices={PRICES} />
        )}
      </main>
    </div>
  )
}
