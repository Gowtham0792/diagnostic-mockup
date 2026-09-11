import type { ComponentType } from 'react'
import { AdvancedMultiVoltageIcon } from './icons'

// One entry per feature icon. Add more as they're generated — the group
// layout below doesn't need to change, just the functionIds lists.
export interface FunctionDef {
  id: string
  label: string
  Icon: ComponentType<{ className?: string }>
}

export const FUNCTIONS: Record<string, FunctionDef> = {
  advancedMultiVoltage: {
    id: 'advancedMultiVoltage',
    label: 'Advanced Multi-Voltage',
    Icon: AdvancedMultiVoltageIcon,
  },
}

export interface FunctionGroup {
  id: string
  label: string
  functionIds: string[]
}

export const functionGroups: FunctionGroup[] = [
  { id: 'essential', label: 'Essential Functions', functionIds: ['advancedMultiVoltage'] },
  { id: 'extended', label: 'Extended Functions', functionIds: [] },
  { id: 'data-subsystem', label: 'Data & Subsystem', functionIds: [] },
]
