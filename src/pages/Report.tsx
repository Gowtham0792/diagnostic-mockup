import { Download, Printer } from 'lucide-react'
import { Card, SectionTitle, Badge } from '../components/ui'
import { dtcs, ecus, vehicle } from '../data/mock'

export default function Report() {
  return (
    <Card className="mx-auto max-w-3xl">
      <div className="flex items-start justify-between border-b border-line pb-4">
        <div>
          <h2 className="text-lg font-semibold">Diagnostic Session Report</h2>
          <p className="text-sm text-muted">Generated {vehicle.lastScan}</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-medium hover:bg-line/40">
            <Printer className="h-4 w-4" /> Print
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-white">
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>
      </div>

      <section className="mt-4">
        <SectionTitle>Vehicle</SectionTitle>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-muted">VIN:</span> {vehicle.vin}</div>
          <div><span className="text-muted">Model:</span> {vehicle.model}</div>
          <div><span className="text-muted">Year:</span> {vehicle.year}</div>
          <div><span className="text-muted">Odometer:</span> {vehicle.odometer.toLocaleString()} km</div>
        </div>
      </section>

      <section className="mt-4">
        <SectionTitle>Faults Found ({dtcs.length})</SectionTitle>
        <ul className="divide-y divide-line text-sm">
          {dtcs.map((d) => (
            <li key={d.code} className="flex items-center gap-3 py-2">
              <span className="font-mono font-medium">{d.code}</span>
              <span className="flex-1 text-muted">{d.description}</span>
              <Badge severity={d.severity}>{d.severity}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <SectionTitle>Modules Scanned</SectionTitle>
        <ul className="text-sm text-muted">
          {ecus.map((e) => (
            <li key={e.address}>• {e.name} — {e.online ? 'responded' : 'no response'} (SW {e.swVersion})</li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <SectionTitle>Recommendation</SectionTitle>
        <p className="text-sm">
          Address P0301 first: inspect cylinder 1 ignition coil and injector, then re-run the misfire monitor.
          Investigate loss of communication with the ABS module (U0121) — check CAN-C wiring and connector at the brake control module, which is currently offline.
        </p>
      </section>
    </Card>
  )
}
