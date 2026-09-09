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
    { label: 'ECU Type', value: 'iABS Premium' },
    { label: 'Device Part Number', value: '400 500 530 0' },
    { label: 'Production date' },
    { label: 'Software Version' },
    { label: 'Part Number (ECU)' },
    { label: 'Parameter File' },
    { label: 'Part Number (Modulator)' },
    { label: 'Odometer Reading' },
    { label: 'Next Service at:' },
  ] as DmsEcuField[],
}
