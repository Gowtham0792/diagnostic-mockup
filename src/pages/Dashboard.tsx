import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { Activity, CircleCheck, CircleAlert, Cpu } from 'lucide-react'
import { Card, SectionTitle, Stat, Badge } from '../components/ui'
import { dtcs, ecus, trend, vehicle } from '../data/mock'

export default function Dashboard() {
  const active = dtcs.filter((d) => d.status === 'active').length
  const online = ecus.filter((e) => e.online).length
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Active Faults" value={String(active)} sub="1 critical" tone={active ? 'bad' : 'ok'} />
        <Stat label="ECUs Online" value={`${online} / ${ecus.length}`} sub="Brake module offline" tone="warn" />
        <Stat label="Readiness Monitors" value="7 / 8" sub="EVAP not ready" tone="warn" />
        <Stat label="Battery" value="14.1 V" sub="Charging" tone="ok" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle>Engine Speed &amp; Coolant — last 40 s</SectionTitle>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ left: -10, right: 8, top: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--line))" />
                <XAxis dataKey="t" tick={{ fontSize: 11, fill: 'rgb(var(--muted))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'rgb(var(--muted))' }} />
                <Tooltip contentStyle={{ background: 'rgb(var(--panel))', border: '1px solid rgb(var(--line))', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="rpm" stroke="rgb(var(--brand))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="coolant" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionTitle>Vehicle</SectionTitle>
          <dl className="space-y-2 text-sm">
            <Row k="VIN" v={vehicle.vin} />
            <Row k="Model" v={vehicle.model} />
            <Row k="Year" v={String(vehicle.year)} />
            <Row k="Odometer" v={`${vehicle.odometer.toLocaleString()} km`} />
            <Row k="Last scan" v={vehicle.lastScan} />
          </dl>
        </Card>
      </div>

      <Card>
        <SectionTitle>Control Units</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ecus.map((e) => (
            <div key={e.address} className="rounded-lg border border-line p-3">
              <div className="flex items-center justify-between">
                <Cpu className="h-4 w-4 text-muted" />
                {e.online ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-500"><CircleCheck className="h-3.5 w-3.5" /> Online</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-red-500"><CircleAlert className="h-3.5 w-3.5" /> Offline</span>
                )}
              </div>
              <div className="mt-2 text-sm font-medium">{e.name}</div>
              <div className="text-xs text-muted">{e.address} · {e.protocol}</div>
              <div className="mt-1 text-xs text-muted">SW {e.swVersion}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>Recent Faults</SectionTitle>
        <ul className="divide-y divide-line">
          {dtcs.map((d) => (
            <li key={d.code} className="flex items-center gap-3 py-2 text-sm">
              <Activity className="h-4 w-4 text-muted" />
              <span className="font-mono font-medium">{d.code}</span>
              <span className="flex-1 truncate text-muted">{d.description}</span>
              <Badge severity={d.severity}>{d.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  )
}
