import clsx from 'clsx'
import type { AuthoringStep } from './steps'

/**
 * Progress stepper shown under the header ("S5 — minimal dots"): a row of dots
 * where the current step elongates, plus the current step's name. Style options
 * are compared in public/highlight-options.html.
 */

export default function Stepper({
  steps,
  currentIndex,
}: {
  steps: AuthoringStep[]
  currentIndex: number
}) {
  return (
    <nav
      aria-label="Progress"
      className="flex shrink-0 items-center gap-3 border-b border-[#e5e8ec] bg-white px-6 py-3"
    >
      <span className="flex items-center gap-1.5">
        {steps.map((step, i) => (
          <span
            key={step.id}
            aria-current={i === currentIndex ? 'step' : undefined}
            className={clsx(
              'h-[9px] rounded-full transition-all duration-300',
              i === currentIndex
                ? 'w-6 bg-[#0b5cd5]'
                : i < currentIndex
                  ? 'w-[9px] bg-[#0b5cd5]'
                  : 'w-[9px] bg-[#cfd6de]',
            )}
          />
        ))}
      </span>
      <span className="text-[13px] font-bold text-[#0b5cd5]">{steps[currentIndex]?.label}</span>
      <span className="text-[12px] text-[#8a94a0]">
        {currentIndex + 1} / {steps.length}
      </span>
    </nav>
  )
}
