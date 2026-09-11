import type { ComponentType } from 'react'
import clsx from 'clsx'
import { Check } from 'lucide-react'

/**
 * Reusable tile chrome for feature icons (e.g. "Advanced Multi-Voltage"). The
 * selected state matches the trailer tiles in "Select vehicle" exactly: solid
 * ZF-blue fill, inverted (white) glyph, a check badge, and a small scale-up —
 * not just a border tint.
 */

const ACCENT = '#1f9ed6'
const SELECTED = '#0b5cd5'

export interface FeatureIconProps {
  className?: string
  selected?: boolean
}

export default function FeatureTile({
  label,
  Icon,
  size = 72,
  selected = false,
  onClick,
}: {
  label: string
  Icon: ComponentType<FeatureIconProps>
  size?: number
  selected?: boolean
  onClick?: () => void
}) {
  const iconSize = Math.round(size * 0.62)

  const tile = (
    <div
      className={clsx(
        'relative grid place-items-center rounded-xl border-2',
        'transition-[transform,background-color,border-color,box-shadow] duration-150',
        selected && 'scale-[1.04] shadow-lg shadow-[#0b5cd5]/25',
      )}
      style={{
        width: size,
        height: size,
        borderColor: selected ? SELECTED : ACCENT,
        background: selected ? SELECTED : '#fff',
      }}
    >
      {selected && (
        <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-white text-[#0b5cd5] shadow ring-1 ring-[#0b5cd5]/20">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      )}
      <div style={{ width: iconSize, height: iconSize }}>
        <Icon className="h-full w-full" selected={selected} />
      </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-2">
      {onClick ? (
        <button type="button" aria-pressed={selected} onClick={onClick} className="border-0 bg-transparent p-0">
          {tile}
        </button>
      ) : (
        tile
      )}
      <span className="max-w-[110px] text-center text-[12px] font-semibold text-[#1a1a1a]">
        {label}
      </span>
    </div>
  )
}
