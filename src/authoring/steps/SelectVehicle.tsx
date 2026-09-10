import { useState } from 'react'
import clsx from 'clsx'
import { vehicleGroups, type TrailerFront } from '../vehicles'

/**
 * Authoring step 1 — "Select vehicle".
 *
 * Layout "L4": pick the trailer kind from a segmented control, then only that
 * kind's axle layouts are shown as a single row of tiles. Alternative layouts
 * live in public/select-vehicle-styles.html.
 */

const ACCENT = '#1f9ed6'
const SELECTED = '#0b5cd5'

export default function SelectVehicle() {
  const [kind, setKind] = useState(vehicleGroups[0].id)
  const [selected, setSelected] = useState<string | null>(null)

  const group = vehicleGroups.find((g) => g.id === kind) ?? vehicleGroups[0]

  return (
    <div className="min-h-0 flex-1 overflow-auto p-6">
      <h1 className="text-[20px] font-bold text-[#1a1a1a]">Select vehicle</h1>

      {/* kind selector */}
      <div className="mt-4 inline-flex overflow-hidden rounded-[10px] border-[1.5px] border-[#dfe3e8]">
        {vehicleGroups.map((g, i) => (
          <button
            key={g.id}
            type="button"
            aria-pressed={kind === g.id}
            onClick={() => setKind(g.id)}
            className={clsx(
              'px-4 py-2 text-[13px] font-semibold transition',
              i > 0 && 'border-l border-[#dfe3e8]',
              kind === g.id ? 'bg-[#0b5cd5] text-white' : 'bg-white text-[#5a6b7b] hover:bg-[#f2fafd]',
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* layouts for the selected kind */}
      <div className="mt-5 flex flex-wrap gap-3">
        {group.options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected === option.id}
            onClick={() => setSelected(option.id)}
            className={clsx(
              'grid h-[88px] w-[92px] place-items-center rounded-xl border-2 bg-white transition',
              selected === option.id
                ? 'bg-[#eef6fb] ring-2 ring-[#0b5cd5]/20'
                : 'hover:bg-[#f2fafd]',
            )}
            style={{ borderColor: selected === option.id ? SELECTED : ACCENT }}
          >
            <TrailerGlyph front={option.front} axleGroups={option.axleGroups} />
          </button>
        ))}
      </div>
    </div>
  )
}

function groupXs(center: number, count: number): number[] {
  const spacing = count >= 3 ? 8 : 9
  return Array.from({ length: count }, (_, i) => center - ((count - 1) * spacing) / 2 + i * spacing)
}

function axleCenterXs(groups: number[], front: TrailerFront): number[] {
  if (groups.length === 1) {
    return groupXs(front === 'gooseneck' ? 58 : 46, groups[0])
  }
  const lo = front === 'drawbar' ? 30 : 34
  const hi = 70
  return groups.flatMap((count, i) =>
    groupXs(lo + ((hi - lo) * i) / (groups.length - 1), count),
  )
}

function TrailerGlyph({ front, axleGroups }: { front: TrailerFront; axleGroups: number[] }) {
  const xs = axleCenterXs(axleGroups, front)
  return (
    <svg width="74" height="48" viewBox="0 0 96 62" fill="none" aria-hidden>
      <rect x="14" y="24" width="68" height="26" rx="4" stroke={ACCENT} strokeWidth="2" />

      {front === 'drawbar' && (
        <>
          <path
            d="M14 44 L7 44 L3 50"
            stroke={ACCENT}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="3" cy="50" r="1.8" fill={ACCENT} />
        </>
      )}

      {front === 'gooseneck' && (
        <>
          <path d="M14 26 C7 26 8 42 3 45" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
          <circle cx="3" cy="49" r="2.6" stroke={ACCENT} strokeWidth="2" />
        </>
      )}

      {front === 'rigid' && (
        <>
          <path d="M14 40 L3 40" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
          <circle cx="3" cy="40" r="1.8" fill={ACCENT} />
        </>
      )}

      {xs.map((x, i) => (
        <circle key={i} cx={x} cy="53" r="4.5" fill="#fff" stroke={ACCENT} strokeWidth="2" />
      ))}
    </svg>
  )
}
