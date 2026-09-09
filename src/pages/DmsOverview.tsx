import { useState } from 'react'
import { Menu, ArrowLeft, Home, ChevronDown, MoreVertical, CheckCircle2 } from 'lucide-react'
import { dms } from '../data/mock'
import zfLogo from '../assets/ZF_logo_STD_Blue_3CC.svg'

/**
 * Faithful visual clone of the ZF "[pro] Diagnostics Suite — DMS Diagnostic
 * Software / OVERVIEW" screen. Fills the whole viewport with no scrolling.
 *
 * Hard-coded ZF light-theme colors (not the mockup design tokens) so it matches
 * the reference 1:1.
 */

const ZF_BLUE = '#0b5cd5'
const DTC_RED = '#e1000f'
const DTC_BLUE = '#0088ce'

export default function DmsOverview() {
  const [tab, setTab] = useState<(typeof dms.tabs)[number]>('OVERVIEW')

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white font-sans text-[#1a1a1a]">
      {/* Blue app bar */}
      <div className="flex shrink-0 items-center gap-3 px-4 py-2 text-white" style={{ background: ZF_BLUE }}>
        <Menu className="h-5 w-5" />
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white p-0.5">
          <img src={zfLogo} alt="ZF" className="h-full w-full" />
        </span>
        <span className="text-[18px]">
          <span className="font-semibold">[pro]</span>Diagnostics Suite
        </span>
        <CheckCircle2 className="h-5 w-5 text-[#7ed957]" />
      </div>

      {/* Sub header */}
      <div className="flex shrink-0 items-center px-4 py-2.5">
        <button className="mr-3 grid h-7 w-7 place-items-center rounded-full border border-[#c9c9c9] text-[#555]">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-[20px] font-normal text-[#333]">{dms.title}</h1>
        <button className="ml-auto flex items-center gap-1.5 text-[16px] font-semibold" style={{ color: ZF_BLUE }}>
          <Home className="h-4 w-4" />
          <img src={zfLogo} alt="ZF" className="h-4 w-6 object-contain" />
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex shrink-0 items-center gap-6 border-b-2 px-5" style={{ borderColor: ZF_BLUE }}>
        {dms.tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="relative -mb-0.5 py-2 text-[14px] tracking-wide"
            style={{ color: tab === t ? ZF_BLUE : '#5a5a5a' }}
          >
            {t}
            {tab === t && (
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-full" style={{ background: ZF_BLUE }} />
            )}
          </button>
        ))}
        <MoreVertical className="h-4 w-4 text-[#5a5a5a]" />
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 px-5 py-3">
        <h2 className="text-[18px] font-bold">Diagnostic Memory</h2>
        <div className="mt-1.5 flex items-center gap-8 text-[16px]">
          <DtcCounter count={dms.memory.active} color={DTC_RED} label="Active DTC" />
          <DtcCounter count={dms.memory.inactive} color={DTC_BLUE} label="Inactive DTC" />
        </div>

        <div className="mt-3 border-b border-[#d9dce1]" />

        <h2 className="mt-3 text-[18px] font-bold">ECU Data</h2>
        <div
          className="mt-2 grid gap-x-6 gap-y-2 border-b border-dashed border-[#c9c9c9] pb-2"
          style={{ gridTemplateColumns: `repeat(${dms.ecuData.length}, minmax(0, 1fr))` }}
        >
          {dms.ecuData.map((f) => (
            <div key={f.label}>
              <div className="text-[13px] text-[#6b7280]">{f.label}</div>
              <div className="text-[16px]">{f.value ?? ' '}</div>
            </div>
          ))}
        </div>
        <div className="border-b border-dashed border-[#c9c9c9]" />
      </div>
    </div>
  )
}

function DtcCounter({ count, color, label }: { count: number; color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2" style={{ color }}>
      <span className="relative inline-block">
        <svg width="22" height="20" viewBox="0 0 22 20" aria-hidden>
          <path d="M11 1 21 19 1 19Z" fill={color} />
        </svg>
        <span
          className="absolute -right-1.5 -top-1.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-white px-[3px] text-[11px] font-bold"
          style={{ color }}
        >
          {count}
        </span>
      </span>
      {label}
    </span>
  )
}
