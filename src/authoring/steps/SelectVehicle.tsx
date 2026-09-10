import { useLayoutEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { vehicleGroups, type TrailerFront } from '../vehicles'

/**
 * Authoring step 1 — "Select vehicle".
 *
 * Layout "L4": pick the trailer kind from a segmented control, then only that
 * kind's axle layouts are shown as a single row of tiles. Alternative layouts
 * live in public/select-vehicle-styles.html.
 *
 * Transitions: the segmented control has a sliding highlight pill; changing the
 * kind re-keys the tile row so the tiles replay a staggered "tile-in" animation
 * (see tailwind.config.js). Honours prefers-reduced-motion via src/index.css.
 */

const ACCENT = '#1f9ed6'
const SELECTED = '#0b5cd5'

export default function SelectVehicle() {
  const [kind, setKind] = useState(vehicleGroups[0].id)
  const [selected, setSelected] = useState<string | null>(null)

  const activeIndex = Math.max(0, vehicleGroups.findIndex((g) => g.id === kind))
  const group = vehicleGroups[activeIndex]

  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [pill, setPill] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const el = btnRefs.current[activeIndex]
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
  }, [activeIndex])

  return (
    <div className="min-h-0 flex-1 overflow-auto p-6">
      <h1 className="text-[20px] font-bold text-[#1a1a1a]">Select vehicle</h1>

      {/* kind selector with sliding highlight */}
      <div className="relative mt-4 inline-flex overflow-hidden rounded-[10px] border-[1.5px] border-[#dfe3e8]">
        <span
          aria-hidden
          className="absolute inset-y-0 rounded-[8px] bg-[#0b5cd5] transition-[left,width] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)]"
          style={{ left: pill.left, width: pill.width }}
        />
        {vehicleGroups.map((g, i) => (
          <button
            key={g.id}
            ref={(el) => {
              btnRefs.current[i] = el
            }}
            type="button"
            aria-pressed={kind === g.id}
            onClick={() => setKind(g.id)}
            className={clsx(
              'relative z-10 px-4 py-2 text-[13px] font-semibold transition-colors duration-200',
              i > 0 && 'border-l border-[#dfe3e8]',
              kind === g.id ? 'text-white' : 'text-[#5a6b7b] hover:text-[#1a1a1a]',
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* layouts for the selected kind — re-keyed so tiles re-animate on change */}
      <div key={kind} className="mt-5 flex flex-wrap gap-3">
        {group.options.map((option, i) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected === option.id}
            onClick={() => setSelected(option.id)}
            style={{
              borderColor: selected === option.id ? SELECTED : ACCENT,
              animationDelay: `${i * 45}ms`,
            }}
            className={clsx(
              'grid h-[88px] w-[92px] animate-tile-in place-items-center rounded-xl border-2 bg-white',
              'transition-[background-color,box-shadow] duration-150',
              selected === option.id
                ? 'bg-[#eef6fb] ring-2 ring-[#0b5cd5]/20'
                : 'hover:bg-[#f2fafd]',
            )}
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
