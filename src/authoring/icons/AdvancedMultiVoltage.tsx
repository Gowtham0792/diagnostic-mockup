/**
 * "Advanced Multi-Voltage" feature icon — lightning bolt + "8-32 V", styled to
 * match the app's tile language (cyan/navy line-art), not a copy of any
 * third-party asset's path data.
 */
export default function AdvancedMultiVoltageIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <text
        x="32"
        y="19"
        textAnchor="middle"
        fontSize="13.5"
        fontWeight="800"
        fill="#0b5cd5"
        fontFamily="-apple-system, Segoe UI, Roboto, sans-serif"
      >
        8 – 32 V
      </text>
      <path d="M38 24 L20 47 L28 47 L24 61 L46 34 L36 34 Z" fill="#1f9ed6" />
    </svg>
  )
}
