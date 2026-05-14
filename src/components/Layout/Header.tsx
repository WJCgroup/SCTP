export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-sm">
          SP
        </div>
        <div>
          <h1 className="font-semibold text-white leading-none">SCTP Portfolio</h1>
          <p className="text-xs text-gray-500 mt-0.5">Simple Portfolio Framework</p>
        </div>
      </div>
      <span className="text-xs text-gray-600">Mock prices · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
    </header>
  )
}
