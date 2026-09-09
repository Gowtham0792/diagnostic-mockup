import { useState } from 'react'
import { Card, SectionTitle, Badge, cn } from '../components/ui'
import { dtcs } from '../data/mock'

export default function Faults() {
  const [selected, setSelected] = useState(dtcs[0].code)
  const current = dtcs.find((d) => d.code === selected)!
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle>Diagnostic Trouble Codes</SectionTitle>
          <button className="rounded-md border border-line px-3 py-1 text-xs font-medium hover:bg-line/40">Clear all</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted">
              <th className="pb-2">Code</th>
              <th className="pb-2">System</th>
              <th className="pb-2">Description</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {dtcs.map((d) => (
              <tr
                key={d.code}
                onClick={() => setSelected(d.code)}
                className={cn('cursor-pointer', selected === d.code ? 'bg-brand/10' : 'hover:bg-line/30')}
              >
                <td className="py-2 font-mono font-medium">{d.code}</td>
                <td className="py-2 text-muted">{d.system}</td>
                <td className="py-2">{d.description}</td>
                <td className="py-2"><Badge severity={d.severity}>{d.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <SectionTitle>Freeze Frame — {current.code}</SectionTitle>
        <p className="mb-3 text-sm text-muted">{current.description}</p>
        <dl className="space-y-2 text-sm">
          {current.freezeFrame.map((f) => (
            <div key={f.label} className="flex justify-between border-b border-line pb-1">
              <dt className="text-muted">{f.label}</dt>
              <dd className="font-medium tabular-nums">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-white">Guided test</button>
          <button className="flex-1 rounded-md border border-line px-3 py-1.5 text-xs font-medium hover:bg-line/40">Freeze snapshot</button>
        </div>
      </Card>
    </div>
  )
}
