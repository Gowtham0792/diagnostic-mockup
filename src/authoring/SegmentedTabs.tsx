import { useLayoutEffect, useRef, useState } from 'react'
import clsx from 'clsx'

/**
 * The group/kind picker used by "Select vehicle" (Drawbar trailer /
 * Semitrailers / Central axle trailer) and reused by "Select Functions"
 * (Essential / Extended / Data & Subsystem) so both look identical.
 *
 * A pill with a sliding ZF-blue highlight, same idea as before — but the
 * segments are now equal-width (`flex-1`, capped by `max-w-md` on wide
 * screens) instead of sized to their label. That guarantees the control is
 * always exactly one line at any viewport: it can't wrap, and a label that
 * doesn't fit its segment truncates with an ellipsis instead of overflowing
 * or forcing a scrollbar.
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
    const measure = () => {
      const el = btnRefs.current[activeIndex]
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    // segment widths depend on the container's width (equal-split), so a
    // resize (e.g. rotating a phone) needs to re-measure the pill too
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeIndex])

  return (
    <div className="relative flex w-full max-w-md overflow-hidden rounded-[10px] border-[1.5px] border-[#dfe3e8] bg-white">
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
          title={o.label}
          className={clsx(
            'relative z-10 min-w-0 flex-1 truncate px-2 py-2 text-[12px] font-semibold transition-colors duration-200 sm:px-3 sm:text-[13px]',
            i > 0 && 'border-l border-[#dfe3e8]',
            active === o.id ? 'text-white' : 'text-[#5a6b7b] hover:text-[#1a1a1a]',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
