import { useEffect, useState } from 'react'
import { Card, SectionTitle, cn } from '../components/ui'
import { pids as basePids } from '../data/mock'

export default function LiveData() {
  const [pids, setPids] = useState(basePids)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setPids((prev) =>
        prev.map((p) => {
          const span = (p.max - p.min) * 0.01
          const next = p.value + (Math.random() - 0.5) * span * 4
          return { ...p, value: Math.max(p.min, Math.min(p.max, next)) }
        }),
      )
    }, 700)
    return () => clearInterval(id)
  }, [running])

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <SectionTitle>Live Parameters</SectionTitle>
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-md border border-line px-3 py-1 text-xs font-medium hover:bg-line/40"
        >
          {running ? 'Pause' : 'Resume'} stream
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pids.map((p) => {
          const pct = ((p.value - p.min) / (p.max - p.min)) * 100
          return (
            <div key={p.id} className="rounded-lg border border-line p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted">{p.name}</span>
                <span className="font-mono text-lg font-semibold tabular-nums">
                  {p.value.toFixed(1)}
                  <span className="ml-1 text-xs text-muted">{p.unit}</span>
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <div
                  className={cn('h-full rounded-full', pct > 85 ? 'bg-red-500' : pct > 65 ? 'bg-amber-500' : 'bg-brand')}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-muted">
                <span>{p.min}</span>
                <span>{p.max}</span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
