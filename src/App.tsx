import { useEffect, useState } from 'react'
import { Gauge, ListTree, Activity, Wrench, FileText, Moon, Sun, Plug, MonitorCog } from 'lucide-react'
import { cn } from './components/ui'
import Dashboard from './pages/Dashboard'
import DmsOverview from './pages/DmsOverview'
import Faults from './pages/Faults'
import LiveData from './pages/LiveData'
import GuidedTest from './pages/GuidedTest'
import Report from './pages/Report'
import { vehicle } from './data/mock'

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: Gauge, el: <Dashboard /> },
  { id: 'faults', label: 'Fault Codes', icon: ListTree, el: <Faults /> },
  { id: 'live', label: 'Live Data', icon: Activity, el: <LiveData /> },
  { id: 'test', label: 'Guided Tests', icon: Wrench, el: <GuidedTest /> },
  { id: 'report', label: 'Report', icon: FileText, el: <Report /> },
  { id: 'dms', label: 'DMS Overview', icon: MonitorCog, el: <DmsOverview /> },
] as const

export default function App() {
  const [page, setPage] = useState<(typeof nav)[number]['id']>('dashboard')
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const current = nav.find((n) => n.id === page)!

  return (
    <div className="flex h-full">
      <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-panel">
        <div className="flex items-center gap-2 border-b border-line px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <Wrench className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">LPS Diagnostics</div>
            <div className="text-[11px] text-muted">v0.1 — mockup</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm',
                page === n.id ? 'bg-brand/15 text-brand' : 'text-muted hover:bg-line/40',
              )}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-line p-3 text-xs text-muted">
          <div className="flex items-center gap-2 text-emerald-500">
            <Plug className="h-3.5 w-3.5" /> VCI connected · DoIP
          </div>
          <div className="mt-1 truncate">{vehicle.vin}</div>
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-line bg-panel px-6 py-3">
          <div>
            <h1 className="text-base font-semibold">{current.label}</h1>
            <p className="text-xs text-muted">{vehicle.model} · {vehicle.year}</p>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            className="rounded-md border border-line p-2 hover:bg-line/40"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>
        <div className="flex-1 overflow-auto p-6">{current.el}</div>
      </main>
    </div>
  )
}
