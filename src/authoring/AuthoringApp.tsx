import { useState } from 'react'
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import zfLogo from '../assets/ZF_logo_STD_Blue_3CC.svg'
import SelectVehicle from './steps/SelectVehicle'
import SelectFunctions from './steps/SelectFunctions'
import Stepper from './Stepper'
import { authoringSteps } from './steps'

// steps with real content, in order; the rest of `authoringSteps` are shown
// in the progress bar but aren't modelled yet
const STEP_SCREENS = [SelectVehicle, SelectFunctions]

/**
 * Web-based parameter Authoring Tool (Option D). Separate page from the field
 * diagnostic mockup; deployed as its own GitHub Pages entry (`authoring.html`).
 *
 * For now this is only the shared "[pro] Diagnostics Suite" header — the authoring
 * canvas below it will be modelled next.
 */

const ZF_BLUE = '#0b5cd5'
const AVATAR_ORANGE = '#e8730c'

export default function AuthoringApp() {
  const [stepIndex, setStepIndex] = useState(0)
  const maxBuiltIndex = STEP_SCREENS.length - 1
  const StepScreen = STEP_SCREENS[stepIndex]

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white font-sans text-[#1a1a1a]">
      <header
        className="flex h-14 shrink-0 items-center gap-3 px-5 text-white shadow-sm"
        style={{ background: ZF_BLUE }}
      >
        <button aria-label="Menu" className="grid place-items-center rounded p-1 hover:bg-white/10">
          <Menu className="h-6 w-6" />
        </button>

        <span className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-white p-[3px]">
          <img src={zfLogo} alt="ZF" className="h-full w-full" />
        </span>

        <span className="text-[17px] tracking-wide">
          <span className="font-bold">[pro]</span>Diagnostics Suite
        </span>

        <ConnectedCloud />

        <span
          className="ml-auto grid h-9 w-9 place-items-center rounded-full text-[13px] font-bold text-white"
          style={{ background: AVATAR_ORANGE }}
          title="Signed in"
        >
          GS
        </span>
      </header>

      <Stepper steps={authoringSteps} currentIndex={stepIndex} />

      {/* Authoring canvas */}
      <main className="flex min-h-0 flex-1 flex-col" data-area="authoring-canvas">
        <StepScreen />
      </main>

      <div className="flex shrink-0 items-center justify-between border-t border-[#e5e8ec] px-6 py-2.5">
        <button
          type="button"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          className="flex items-center gap-1 rounded-md border border-[#dfe3e8] px-3 py-1.5 text-[13px] font-semibold text-[#5a6b7b] disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          disabled={stepIndex === maxBuiltIndex}
          onClick={() => setStepIndex((i) => Math.min(maxBuiltIndex, i + 1))}
          className="flex items-center gap-1 rounded-md px-3 py-1.5 text-[13px] font-semibold text-white disabled:opacity-40"
          style={{ background: ZF_BLUE }}
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function ConnectedCloud() {
  return (
    <svg
      className="ml-2"
      width="36"
      height="28"
      viewBox="0 0 36 28"
      role="img"
      aria-label="Connected"
    >
      <path
        d="M10 22h13.5a6 6 0 0 0 1.2-11.88A8.5 8.5 0 0 0 8.7 8.2 6.4 6.4 0 0 0 10 22z"
        fill="#e9f7ef"
        stroke="#2fa45a"
        strokeWidth="1.8"
      />
      <circle cx="25" cy="19" r="7.5" fill="#2fa45a" stroke="#fff" strokeWidth="1.6" />
      <path
        d="M21.6 19.2l2.2 2.2 4.4-4.9"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
