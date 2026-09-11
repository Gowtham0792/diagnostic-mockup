import type { ReactNode } from 'react'

/**
 * Reusable tile chrome for feature icons (e.g. "Advanced Multi-Voltage"): white
 * tile, cyan border, label below. No info badge. Pass an icon component from
 * src/authoring/icons/ as the child.
 */

const ACCENT = '#1f9ed6'

export default function FeatureTile({
  label,
  size = 72,
  children,
}: {
  label: string
  size?: number
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="grid place-items-center rounded-xl border-2 bg-white"
        style={{ width: size, height: size, borderColor: ACCENT }}
      >
        {children}
      </div>
      <span className="max-w-[110px] text-center text-[12px] font-semibold text-[#1a1a1a]">
        {label}
      </span>
    </div>
  )
}
