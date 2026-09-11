import { useState } from 'react'
import FeatureTile from '../FeatureTile'
import SegmentedTabs from '../SegmentedTabs'
import { functionGroups, FUNCTIONS } from '../functionsCatalog'

/**
 * Authoring step 2 — "Select Functions". Same pattern as step 1's
 * "Select vehicle": a segmented pill control picks the group (Essential
 * Functions / Extended Functions / Data & Subsystem), then that group's tiles
 * show as a single row. Selected-tile treatment matches the trailer tiles
 * exactly (see FeatureTile). Icons are added to functionsCatalog.ts one at a
 * time as they're generated — an empty group just shows a placeholder note.
 */

export default function SelectFunctions() {
  const [group, setGroup] = useState(functionGroups[0].id)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const activeGroup = functionGroups.find((g) => g.id === group) ?? functionGroups[0]

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-[17px] font-bold tracking-tight sm:text-[19px]">
        <span className="text-[#0b5cd5]">Step 2</span>
        <span className="px-2 font-normal text-[#c1c7cf]">/</span>
        <span className="text-[#1a1a1a]">Select Functions</span>
      </h1>

      <div className="mt-4">
        <SegmentedTabs
          options={functionGroups.map((g) => ({ id: g.id, label: g.label }))}
          active={group}
          onChange={setGroup}
        />
      </div>

      <div key={group} className="mt-5 flex flex-wrap gap-2.5 pt-1 sm:gap-3.5">
        {activeGroup.functionIds.length === 0 ? (
          <span className="text-[12px] text-[#8a94a0]">No functions here yet</span>
        ) : (
          activeGroup.functionIds.map((id) => {
            const fn = FUNCTIONS[id]
            const isSelected = selected.has(id)
            return (
              <FeatureTile
                key={id}
                label={fn.label}
                Icon={fn.Icon}
                selected={isSelected}
                onClick={() => toggle(id)}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
