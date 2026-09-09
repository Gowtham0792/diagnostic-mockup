import { useState } from 'react'
import {
  Menu,
  ArrowLeft,
  Home,
  ChevronDown,
  MoreVertical,
  CheckCircle2,
  Minus,
  Plus,
  Maximize2,
} from 'lucide-react'

/**
 * Faithful visual clone of the ZF "[pro] Diagnostics Suite — DMS Diagnostic
 * Software / OVERVIEW" screen from the supplied screenshot. This deliberately
 * renders in the ZF light theme with hard-coded ZF colors (not the mockup's
 * design tokens) so it matches the reference 1:1.
 *
 * The promo graphic is ZF marketing artwork that isn't in this repo, so it is
 * approximated with an inline SVG scene.
 */

const ZF_BLUE = '#0b5cd5'
const DTC_RED = '#e1000f'
const DTC_BLUE = '#0088ce'

const tabs = ['OVERVIEW', 'DIAGNOSTIC MEMORY', 'CONTROL', 'SYSTEM'] as const

const ecuFields: { label: string; value?: string }[] = [
  { label: 'Mode of ECU', value: 'Shipping Mode' },
  { label: 'Part Number', value: '884 112 240 0' },
  { label: 'Software Version', value: '1.1' },
  { label: 'Hardware Number' },
  { label: 'Parameter File', value: '01.02.10' },
  { label: 'Serial Number', value: '2025111900001' },
  { label: 'Production Date', value: '12/25/2025' },
]

export default function DmsOverview() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('OVERVIEW')

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1180px] overflow-hidden rounded-md border border-[#d9d9d9] bg-white text-[#1a1a1a] shadow-sm">
        {/* Windows title bar */}
        <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-1.5 text-[11px] text-[#3a3a3a]">
          <ZfMark className="h-3.5 w-6" />
          <span>ZF [pro]Diagnostics Suite Stg Demo V1.65.0</span>
          <div className="ml-auto flex items-center gap-3 text-[#7a7a7a]">
            <span className="inline-block h-2.5 w-2.5 border-b border-[#7a7a7a]" />
            <span className="inline-block h-2.5 w-2.5 border border-[#7a7a7a]" />
            <span>✕</span>
          </div>
        </div>

        {/* Blue app bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 text-white" style={{ background: ZF_BLUE }}>
          <Menu className="h-5 w-5" />
          <ZfMark className="h-4 w-7" light />
          <span className="text-[15px]">
            <span className="font-semibold">[pro]</span>Diagnostics Suite
          </span>
          <CheckCircle2 className="h-5 w-5 text-[#7ed957]" />
        </div>

        {/* Sub header */}
        <div className="flex items-center px-4 py-3">
          <button className="mr-3 grid h-7 w-7 place-items-center rounded-full border border-[#c9c9c9] text-[#555]">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-[17px] font-normal text-[#333]">DMS Diagnostic Software</h1>
          <button className="ml-auto flex items-center gap-1 text-[13px] font-semibold" style={{ color: ZF_BLUE }}>
            <Home className="h-4 w-4" />
            ZF
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b-2 px-5" style={{ borderColor: ZF_BLUE }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative -mb-0.5 py-2 text-[12px] tracking-wide"
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
        <div className="px-5 pb-10 pt-5">
          <h2 className="text-[15px] font-bold text-[#1a1a1a]">Diagnostic Memory</h2>
          <div className="mt-2 flex items-center gap-8 text-[13px]">
            <DtcCounter count={1} color={DTC_RED} label="Active DTC" />
            <DtcCounter count={3} color={DTC_BLUE} label="Inactive DTC" />
          </div>

          <h2 className="mt-6 text-[15px] font-bold text-[#1a1a1a]">ECU Data</h2>
          <div className="mt-3 flex flex-wrap gap-x-12 gap-y-3 border-b border-dashed border-[#c9c9c9] pb-3">
            {ecuFields.map((f) => (
              <div key={f.label} className="min-w-[90px]">
                <div className="text-[11px] text-[#6b7280]">{f.label}</div>
                <div className="text-[13px] text-[#1a1a1a]">{f.value ?? ' '}</div>
              </div>
            ))}
          </div>
          <div className="border-b border-dashed border-[#c9c9c9]" />

          {/* Promo graphic */}
          <div className="relative mt-6 flex justify-center">
            <AddwGraphic />
          </div>

          {/* Zoom control */}
          <div className="mt-4 inline-flex items-center gap-3 rounded-md bg-[#4b4b4b]/85 px-3 py-1.5 text-[12px] text-white">
            <span>…NN TDTGG2</span>
            <button><Minus className="h-3.5 w-3.5" /></button>
            <button><Plus className="h-3.5 w-3.5" /></button>
            <button><Maximize2 className="h-3.5 w-3.5" /></button>
          </div>

          <div className="mt-6 text-center text-[18px] font-extrabold tracking-wide" style={{ color: DTC_RED }}>
            DEMO MODE!
          </div>
        </div>
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
        <span className="absolute -right-1.5 -top-1.5 grid h-[14px] min-w-[14px] place-items-center rounded-full bg-white px-[3px] text-[9px] font-bold" style={{ color }}>
          {count}
        </span>
      </span>
      {label}
    </span>
  )
}

function ZfMark({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: 10,
        letterSpacing: 0.5,
        color: light ? ZF_BLUE : '#fff',
        background: light ? '#fff' : ZF_BLUE,
        borderRadius: 2,
      }}
    >
      ZF
    </span>
  )
}

function AddwGraphic() {
  return (
    <svg viewBox="0 0 460 250" className="w-full max-w-[440px] rounded-sm border border-[#e5e5e5]" role="img" aria-label="Advanced Driver Distraction Warning promotional graphic">
      <defs>
        <clipPath id="addwClip"><rect width="460" height="250" /></clipPath>
      </defs>
      <g clipPath="url(#addwClip)">
        <rect width="460" height="250" fill="#e9edf0" />
        {/* right: road view */}
        <rect x="250" y="0" width="210" height="250" fill="#8a9aa5" />
        <rect x="250" y="150" width="210" height="100" fill="#5f6d75" />
        <rect x="330" y="60" width="60" height="90" fill="#b9c4cb" />
        {/* left: cab / driver */}
        <rect x="0" y="0" width="250" height="250" fill="#f3f4f5" />
        <path d="M0 0 250 0 250 250 0 250Z" fill="#d64550" opacity="0.28" />
        <path d="M0 250 250 40 250 250Z" fill="#c62431" opacity="0.55" />
        {/* seat */}
        <rect x="18" y="70" width="70" height="150" rx="10" fill="#e8e9ea" />
        {/* driver */}
        <circle cx="120" cy="95" r="26" fill="#caa588" />
        <path d="M92 150c0-24 13-40 28-40s28 16 28 40v70H92Z" fill="#7a1f28" />
        <rect x="112" y="120" width="16" height="60" fill="#f2f2f2" />
        {/* face-scan dots */}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={i} cx={104 + (i % 6) * 6} cy={82 + Math.floor(i / 6) * 8} r="1" fill="#ffffff" />
        ))}
        {/* warning triangle */}
        <path d="M300 70 340 140 260 140Z" fill="none" stroke={DTC_BLUE} strokeWidth="7" strokeLinejoin="round" />
        <rect x="297" y="92" width="6" height="26" rx="3" fill={DTC_BLUE} />
        <circle cx="300" cy="128" r="3.5" fill={DTC_BLUE} />
        {/* caption */}
        <text x="14" y="230" fontFamily="system-ui, sans-serif" fontStyle="italic" fontWeight="600" fontSize="17" fill="#ffffff" opacity="0.92">
          Advanced Driver Distraction Warning
        </text>
        <text x="424" y="238" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="13" fill="#ffffff">ZF</text>
      </g>
    </svg>
  )
}
