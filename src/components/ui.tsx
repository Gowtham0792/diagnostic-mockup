import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import type { Severity } from '../data/mock'

export const cn = (...a: unknown[]) => twMerge(clsx(a))

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-xl border border-line bg-panel p-4 shadow-sm', className)}>
      {children}
    </div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">{children}</h2>
}

const sevStyles: Record<Severity, string> = {
  critical: 'bg-red-500/15 text-red-500 ring-red-500/30',
  warning: 'bg-amber-500/15 text-amber-500 ring-amber-500/30',
  info: 'bg-sky-500/15 text-sky-500 ring-sky-500/30',
}

export function Badge({ severity, children }: { severity: Severity; children: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset', sevStyles[severity])}>
      {children}
    </span>
  )
}

export function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: 'ok' | 'warn' | 'bad' }) {
  const toneClass = tone === 'bad' ? 'text-red-500' : tone === 'warn' ? 'text-amber-500' : tone === 'ok' ? 'text-emerald-500' : 'text-ink'
  return (
    <Card>
      <div className="text-xs font-medium text-muted">{label}</div>
      <div className={cn('mt-1 text-2xl font-semibold tabular-nums', toneClass)}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted">{sub}</div>}
    </Card>
  )
}
