import type { ReactNode } from 'react'

/**
 * Reusable tile chrome for feature icons (e.g. "Advanced Multi-Voltage"): white
 * tile, cyan border, label below. No info badge. Pass an icon component from
 * src/authoring/icons/ as the child. Optionally selectable (used by
 * "Select Functions").
 */

const ACCENT = '#1f9ed6'
const SELECTED = '#0b5cd5'

export default function FeatureTile({
  label,
  size = 72,
  selected = false,
  onClick,
  children,
}: {
  label: string
  size?: number
  selected?: boolean
  onClick?: () => void
  children: ReactNode
}) {
  const tile = (
    <div
      className="grid place-items-center rounded-xl border-2 transition-colors"
      style={{
        width: size,
        height: size,
        borderColor: selected ? SELECTED : ACCENT,
        background: selected ? '#eef6fb' : '#fff',
      }}
    >
      {children}
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
