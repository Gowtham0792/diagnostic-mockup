import clsx from 'clsx'
import type { AuthoringStep } from './steps'

/**
 * Progress stepper shown under the header ("S5 — minimal dots"), centred: the
 * current step name (+ counter) on top, the dot row beneath it. Style options
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
      className="flex shrink-0 flex-col items-center gap-1.5 border-b border-[#e5e8ec] bg-white px-3 py-2 sm:px-6 sm:py-2.5"
    >
      <div className="flex items-baseline gap-2">
        <span className="text-[13px] font-bold text-[#0b5cd5]">{steps[currentIndex]?.label}</span>
        <span className="text-[12px] text-[#8a94a0]">
          {currentIndex + 1} / {steps.length}
        </span>
      </div>
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
    </nav>
  )
}
