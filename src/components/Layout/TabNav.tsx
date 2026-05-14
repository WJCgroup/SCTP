export type TabId = 'dashboard' | 'holdings' | 'dca' | 'charts'

const TABS: { id: TabId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'holdings', label: 'Holdings' },
  { id: 'dca', label: 'DCA Tracker' },
  { id: 'charts', label: 'Charts' },
]

interface Props {
  active: TabId
  onChange: (tab: TabId) => void
}

export default function TabNav({ active, onChange }: Props) {
  return (
    <nav className="flex border-b border-gray-800 bg-gray-900 px-6">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            active === tab.id
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
