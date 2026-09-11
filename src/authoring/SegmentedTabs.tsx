import { useLayoutEffect, useRef, useState } from 'react'
import clsx from 'clsx'

/**
 * The pill-style segmented control used by "Select vehicle" (Drawbar trailer /
 * Semitrailers / Central axle trailer) and reused by "Select Functions"
 * (Essential / Extended / Data & Subsystem) so both look identical. A sliding
 * ZF-blue highlight animates to whichever segment is active.
 */

export interface SegmentOption {
  id: string
  label: string
}

export default function SegmentedTabs({
  options,
  active,
  onChange,
}: {
  options: SegmentOption[]
  active: string
  onChange: (id: string) => void
}) {
  const activeIndex = Math.max(0, options.findIndex((o) => o.id === active))
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [pill, setPill] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const el = btnRefs.current[activeIndex]
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
  }, [activeIndex])

  return (
    // the pill itself never wraps (its sliding highlight assumes one row), so on
    // narrow screens it scrolls horizontally *within its own box* instead of
    // forcing the whole page to scroll sideways
    <div className="max-w-full overflow-x-auto">
      <div className="relative inline-flex overflow-hidden rounded-[10px] border-[1.5px] border-[#dfe3e8]">
        <span
          aria-hidden
          className="absolute inset-y-0 rounded-[8px] bg-[#0b5cd5] transition-[left,width] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)]"
          style={{ left: pill.left, width: pill.width }}
        />
        {options.map((o, i) => (
          <button
            key={o.id}
            ref={(el) => {
              btnRefs.current[i] = el
            }}
            type="button"
            aria-pressed={active === o.id}
            onClick={() => onChange(o.id)}
            className={clsx(
              'relative z-10 shrink-0 whitespace-nowrap px-3 py-2 text-[12.5px] font-semibold transition-colors duration-200 sm:px-4 sm:text-[13px]',
              i > 0 && 'border-l border-[#dfe3e8]',
              active === o.id ? 'text-white' : 'text-[#5a6b7b] hover:text-[#1a1a1a]',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
