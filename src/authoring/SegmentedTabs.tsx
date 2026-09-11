import { ChevronDown } from 'lucide-react'

/**
 * The group/kind picker used by "Select vehicle" (Drawbar trailer /
 * Semitrailers / Central axle trailer) and reused by "Select Functions"
 * (Essential / Extended / Data & Subsystem) so both look identical.
 *
 * A native <select> — it is inherently a single line at any width and never
 * needs to wrap or scroll, unlike a row of buttons/chips (which either
 * overflows long labels on narrow screens or wraps and eats vertical space).
 * It's also compact and scales to however many options a group ends up with.
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
  return (
    <div className="relative inline-block">
      <select
        value={active}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-[10px] border-[1.5px] border-[#dfe3e8] bg-white py-2 pl-3.5 pr-9 text-[13px] font-semibold text-[#0b5cd5] focus:outline-none focus:ring-2 focus:ring-[#0b5cd5]/25"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a6b7b]" />
    </div>
  )
}
