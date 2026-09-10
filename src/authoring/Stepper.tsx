import clsx from 'clsx'
import { Check } from 'lucide-react'
import type { AuthoringStep } from './steps'

/**
 * Horizontal progress stepper shown under the header so the current authoring
 * step is always visible. Style options are compared in
 * public/highlight-options.html.
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
      className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-[#e5e8ec] bg-white px-6 py-3"
    >
      {steps.map((step, i) => {
        const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo'
        return (
          <div key={step.id} className="flex items-center gap-2">
            <span
              aria-current={state === 'current' ? 'step' : undefined}
              className={clsx(
                'grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold transition',
                state === 'current' && 'bg-[#0b5cd5] text-white ring-4 ring-[#0b5cd5]/15',
                state === 'done' && 'bg-[#0b5cd5] text-white',
                state === 'todo' && 'border-2 border-[#cfd6de] bg-white text-[#8a94a0]',
              )}
            >
              {state === 'done' ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={clsx(
                'whitespace-nowrap text-[13px]',
                state === 'current' ? 'font-bold text-[#0b5cd5]' : 'font-medium text-[#5a6b7b]',
              )}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && <span className="mx-2 h-px w-8 shrink-0 bg-[#d9dce1]" />}
          </div>
        )
      })}
    </nav>
  )
}
