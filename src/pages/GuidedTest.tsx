import { useState } from 'react'
import { Check, ChevronRight, Play } from 'lucide-react'
import { Card, SectionTitle, cn } from '../components/ui'
import { guidedTest } from '../data/mock'

export default function GuidedTest() {
  const [active, setActive] = useState(2)
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
      <Card>
        <SectionTitle>{guidedTest.name}</SectionTitle>
        <ol className="space-y-1">
          {guidedTest.steps.map((s) => {
            const done = s.id < active
            const isActive = s.id === active
            return (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm',
                    isActive ? 'bg-brand/10' : 'hover:bg-line/30',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                      done ? 'bg-emerald-500 text-white' : isActive ? 'bg-brand text-white' : 'bg-line text-muted',
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : s.id}
                  </span>
                  <span className={cn('flex-1', isActive && 'font-medium')}>{s.title}</span>
                  <ChevronRight className="h-4 w-4 text-muted" />
                </button>
              </li>
            )
          })}
        </ol>
      </Card>

      <Card>
        <SectionTitle>Step {active}</SectionTitle>
        <h3 className="text-base font-semibold">{guidedTest.steps[active - 1].title}</h3>
        <p className="mt-1 text-sm text-muted">{guidedTest.steps[active - 1].detail}</p>

        <div className="mt-4 rounded-lg border border-line bg-line/20 p-4">
          <div className="text-xs font-medium text-muted">Primary current (coil 1)</div>
          <div className="mt-1 font-mono text-3xl font-semibold tabular-nums">7.8 <span className="text-base text-muted">A</span></div>
          <div className="mt-1 text-xs text-emerald-500">Within expected 6.5–9.0 A</div>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white">
            <Play className="h-4 w-4" /> Run actuation
          </button>
          <button
            onClick={() => setActive((a) => Math.min(guidedTest.steps.length, a + 1))}
            className="rounded-md border border-line px-4 py-2 text-sm font-medium hover:bg-line/40"
          >
            Next step
          </button>
        </div>
      </Card>
    </div>
  )
}
