// All mock data for the visual prototype. No backend — values are static.

export interface DmsEcuField {
  label: string
  value?: string
}

export const dms = {
  title: 'iABS Diagnostic Software',
  tabs: ['OVERVIEW', 'DIAGNOSTIC MEMORY', 'CONTROL', 'SYSTEM'] as const,
  memory: { active: 1, inactive: 3 },
  ecuData: [
    { label: 'ECU Type' },
    { label: 'Device Part Number' },
    { label: 'Production date' },
    { label: 'Software Version' },
    { label: 'Part Number (ECU)' },
    { label: 'Parameter File' },
    { label: 'Part Number (Modulator)' },
    { label: 'Odometer Reading' },
    { label: 'Next Service at:' },
  ] as DmsEcuField[],
}
