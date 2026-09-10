import { useState } from 'react'
import clsx from 'clsx'
import { vehicleGroups, type TrailerFront } from '../vehicles'

/**
 * Authoring step 1 — "Select vehicle": choose the trailer kind (drawbar /
 * semitrailer / central-axle) and axle layout from a picture grid.
 */

const ACCENT = '#1f9ed6'
const SELECTED = '#0b5cd5'

export default function SelectVehicle() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="min-h-0 flex-1 overflow-auto p-8">
      <h1 className="text-[20px] font-bold text-[#1a1a1a]">Select vehicle</h1>

      <div className="mt-5 space-y-8">
        {vehicleGroups.map((group) => (
          <section key={group.id}>
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-bold text-[#1a1a1a]">{group.label}</span>
              <span className="flex-1 border-t border-dashed border-[#c9c9c9]" />
            </div>

            <div className="mt-3 flex flex-wrap gap-4">
              {group.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected === option.id}
                  onClick={() => setSelected(option.id)}
                  className={clsx(
                    'grid h-24 w-24 place-items-center rounded-2xl border-2 bg-white transition',
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
          </section>
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
    <svg width="72" height="46" viewBox="0 0 96 62" fill="none" aria-hidden>
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
