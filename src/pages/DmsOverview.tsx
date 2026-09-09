import { useState } from 'react'
import { AlertTriangle, ChevronLeft, MoreVertical, Home, ChevronDown } from 'lucide-react'
import { Card } from '../components/ui'
import { cn } from '../components/ui'
import { dms } from '../data/mock'

const tabs = ['Overview', 'Diagnostic Memory', 'Control', 'System'] as const

export default function DmsOverview() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Overview')

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {/* App title bar */}
      <div className="overflow-hidden rounded-xl border border-line">
        <div className="flex items-center gap-2 bg-brand px-4 py-2 text-white">
          <MoreVertical className="h-4 w-4 opacity-80" />
          <span className="text-sm font-semibold tracking-wide">[pro] Diagnostics Suite</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px]">
            connected
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-line bg-panel px-4 py-3">
          <div className="flex items-center gap-2">
            <button className="rounded-full border border-line p-1 text-muted hover:bg-line/40">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-base font-semibold">{dms.title}</h2>
          </div>
          <button className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-xs text-muted hover:bg-line/40">
            <Home className="h-3.5 w-3.5" /> ZF <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-line bg-panel px-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'border-b-2 px-3 py-2 text-xs font-medium uppercase tracking-wide',
                tab === t ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-ink',
              )}
            >
              {t}
            </button>
          ))}
          <MoreVertical className="ml-1 h-4 w-4 text-muted" />
        </div>

        <div className="space-y-6 bg-panel p-5">
          {/* Diagnostic Memory */}
          <section>
            <h3 className="mb-3 text-sm font-semibold">Diagnostic Memory</h3>
            <div className="flex flex-wrap gap-6 text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
                  {dms.memory.active}
                </span>
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-red-500">Active DTC</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-500 px-1 text-[11px] font-bold text-white">
                  {dms.memory.inactive}
                </span>
                <AlertTriangle className="h-4 w-4 text-sky-500" />
                <span className="text-sky-500">Inactive DTC</span>
              </span>
            </div>
          </section>

          {/* ECU Data */}
          <section>
            <h3 className="mb-3 text-sm font-semibold">ECU Data</h3>
            <div className="grid gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
              <Field label="Mode of ECU" value={dms.modeOfEcu} />
              {dms.ecuData.map((f) => (
                <Field key={f.label} label={f.label} value={f.value} />
              ))}
            </div>
          </section>

          {/* Feature image placeholder */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-line bg-gradient-to-r from-red-600/80 via-slate-500/40 to-slate-700/60">
              <div className="flex h-56 items-center justify-center">
                <AlertTriangle className="h-16 w-16 text-sky-300/90" strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-2 left-3 text-lg font-semibold italic text-white/90 drop-shadow">
                {dms.featureName}
              </div>
              <div className="absolute bottom-2 right-3 text-xs font-bold text-white/80">ZF</div>
            </div>
          </div>

          {dms.demoMode && (
            <div className="text-center text-lg font-extrabold tracking-widest text-red-500">DEMO MODE!</div>
          )}
        </div>
      </div>

      {tab !== 'Overview' && (
        <Card className="text-sm text-muted">The “{tab}” tab is not part of this mockup yet.</Card>
      )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-dashed border-line pb-1">
      <div className="text-[11px] text-muted">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  )
}
