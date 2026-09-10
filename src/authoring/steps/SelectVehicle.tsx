import { useState } from 'react'
import clsx from 'clsx'
import { vehicleGroups, type TrailerFront } from '../vehicles'

/**
 * Authoring step 1 — "Select vehicle": choose the trailer kind (drawbar /
 * semitrailer / central-axle) and axle layout from a picture grid.
 *
 * Layout "L1 — unified strip": all options on one line as labelled clusters with
 * dividers; wraps cluster-by-cluster when the window is narrow. Alternative
 * layouts live in public/select-vehicle-styles.html.
 */

const ACCENT = '#1f9ed6'
const SELECTED = '#0b5cd5'

export default function SelectVehicle() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="min-h-0 flex-1 overflow-auto p-6">
      <h1 className="text-[20px] font-bold text-[#1a1a1a]">Select vehicle</h1>

      <div className="mt-4 flex flex-wrap items-stretch gap-x-2.5 gap-y-4">
        {vehicleGroups.map((group, i) => (
          <div key={group.id} className="flex items-center">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="w-full text-[11px] font-bold uppercase tracking-wide text-[#5a6b7b] sm:w-auto">
                {group.label}
              </span>
              {group.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected === option.id}
                  onClick={() => setSelected(option.id)}
                  className={clsx(
                    'grid h-[60px] w-[68px] place-items-center rounded-xl border-2 bg-white transition',
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
            {i < vehicleGroups.length - 1 && (
              <span className="mx-2 hidden w-px self-stretch bg-[#dfe3e8] sm:block" />
            )}
          </div>
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
    <svg width="58" height="38" viewBox="0 0 96 62" fill="none" aria-hidden>
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
