import { useState } from 'react'
import FeatureTile from '../FeatureTile'
import { functionGroups, FUNCTIONS } from '../functionsCatalog'

/**
 * Authoring step 2 — "Select Functions". Same grouped-section layout as
 * step 1's "Select vehicle": a bold group label with a trailing dashed rule,
 * then a wrapping row of tiles. Three groups: Essential Functions, Extended
 * Functions, Data & Subsystem. Icons are added to functionsCatalog.ts one at
 * a time as they're generated — empty groups just show a placeholder note.
 */

export default function SelectFunctions() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="min-h-0 flex-1 overflow-auto p-6">
      <h1 className="text-[19px] font-bold tracking-tight">
        <span className="text-[#0b5cd5]">Step 2</span>
        <span className="px-2 font-normal text-[#c1c7cf]">/</span>
        <span className="text-[#1a1a1a]">Select Functions</span>
      </h1>

      <div className="mt-5 space-y-8">
        {functionGroups.map((group) => (
          <section key={group.id}>
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-bold text-[#1a1a1a]">{group.label}</span>
              <span className="flex-1 border-t border-dashed border-[#c9c9c9]" />
            </div>

            <div className="mt-3 flex flex-wrap gap-4">
              {group.functionIds.length === 0 ? (
                <span className="text-[12px] text-[#8a94a0]">No functions here yet</span>
              ) : (
                group.functionIds.map((id) => {
                  const fn = FUNCTIONS[id]
                  const isSelected = selected.has(id)
                  return (
                    <FeatureTile
                      key={id}
                      label={fn.label}
                      selected={isSelected}
                      onClick={() => toggle(id)}
                    >
                      <fn.Icon className="h-14 w-14" />
                    </FeatureTile>
                  )
                })
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
