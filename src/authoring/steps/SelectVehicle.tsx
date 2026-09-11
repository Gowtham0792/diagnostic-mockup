import { useState } from 'react'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import SegmentedTabs from '../SegmentedTabs'
import { vehicleGroups, type TrailerFront } from '../vehicles'

/**
 * Authoring step 1 — "Select vehicle".
 *
 * Layout "L4": pick the trailer kind from a segmented control, then only that
 * kind's axle layouts are shown as a single row of tiles.
 *
 * Selected tile: solid ZF-blue fill, inverted (white) glyph, check badge and a
 * small scale-up — far more ascertain than a border tint. Other options are
 * compared in public/highlight-options.html.
 */

const ACCENT = '#1f9ed6'

export default function SelectVehicle() {
  const [kind, setKind] = useState(vehicleGroups[0].id)
  const [selected, setSelected] = useState<string | null>(null)

  const group = vehicleGroups.find((g) => g.id === kind) ?? vehicleGroups[0]

  return (
    <div className="p-6">
      <h1 className="text-[19px] font-bold tracking-tight">
        <span className="text-[#0b5cd5]">Step 1</span>
        <span className="px-2 font-normal text-[#c1c7cf]">/</span>
        <span className="text-[#1a1a1a]">Select vehicle</span>
      </h1>

      {/* kind selector with sliding highlight */}
      <div className="mt-4">
        <SegmentedTabs
          options={vehicleGroups.map((g) => ({ id: g.id, label: g.label }))}
          active={kind}
          onChange={setKind}
        />
      </div>

      {/* layouts for the selected kind — re-keyed so tiles re-animate on change */}
      <div key={kind} className="mt-5 flex flex-wrap gap-3.5 pt-1">
        {group.options.map((option, i) => {
          const isSel = selected === option.id
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSel}
              onClick={() => setSelected(option.id)}
              style={{ animationDelay: `${i * 45}ms` }}
              className={clsx(
                'relative grid h-[88px] w-[92px] animate-tile-in place-items-center rounded-xl border-2',
                'transition-[transform,background-color,border-color,box-shadow] duration-150',
                isSel
                  ? 'scale-[1.04] border-[#0b5cd5] bg-[#0b5cd5] shadow-lg shadow-[#0b5cd5]/25'
                  : 'border-[#1f9ed6] bg-white hover:bg-[#f2fafd]',
              )}
            >
              {isSel && (
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-white text-[#0b5cd5] shadow ring-1 ring-[#0b5cd5]/20">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              )}
              <TrailerGlyph front={option.front} axleGroups={option.axleGroups} selected={isSel} />
            </button>
          )
        })}
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

function TrailerGlyph({
  front,
  axleGroups,
  selected,
}: {
  front: TrailerFront
  axleGroups: number[]
  selected?: boolean
}) {
  const xs = axleCenterXs(axleGroups, front)
  const c = selected ? '#ffffff' : ACCENT
  const wheelFill = selected ? '#0b5cd5' : '#ffffff'
  return (
    <svg width="74" height="48" viewBox="0 0 96 62" fill="none" aria-hidden>
      <rect x="14" y="24" width="68" height="26" rx="4" stroke={c} strokeWidth="2" />

      {front === 'drawbar' && (
        <>
          <path
            d="M14 44 L7 44 L3 50"
            stroke={c}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="3" cy="50" r="1.8" fill={c} />
        </>
      )}

      {front === 'gooseneck' && (
        <>
          <path d="M14 26 C7 26 8 42 3 45" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <circle cx="3" cy="49" r="2.6" stroke={c} strokeWidth="2" />
        </>
      )}

      {front === 'rigid' && (
        <>
          <path d="M14 40 L3 40" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <circle cx="3" cy="40" r="1.8" fill={c} />
        </>
      )}

      {xs.map((x, i) => (
        <circle key={i} cx={x} cy="53" r="4.5" fill={wheelFill} stroke={c} strokeWidth="2" />
      ))}
    </svg>
  )
}
