import clsx from 'clsx'

/**
 * The group/kind selector used by "Select vehicle" (Drawbar trailer /
 * Semitrailers / Central axle trailer) and reused by "Select Functions"
 * (Essential / Extended / Data & Subsystem) so both look identical.
 *
 * Rendered as independent rounded chips in a wrapping row rather than one
 * joined pill with a sliding highlight — a joined pill only works as a single
 * line, so on narrow screens with longer labels it either overflows (forcing
 * a horizontal scrollbar) or gets clipped. Chips just wrap to a second line
 * and never need to scroll, at any width.
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
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={active === o.id}
          onClick={() => onChange(o.id)}
          className={clsx(
            'rounded-full border-[1.5px] px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 sm:px-4 sm:text-[13px]',
            active === o.id
              ? 'border-[#0b5cd5] bg-[#0b5cd5] text-white'
              : 'border-[#dfe3e8] bg-white text-[#5a6b7b] hover:border-[#bcd3f5] hover:text-[#1a1a1a]',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
