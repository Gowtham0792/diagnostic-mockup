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
    { label: 'Software Version', value: 'tabs101' },
    { label: 'Part Number (ECU)', value: '446 108 423 2' },
    { label: 'Parameter File', value: '1.12.10' },
    { label: 'Odometer Reading', value: '11500 kms' },
    { label: 'Next Service at:', value: '5000 kms' },
    { label: 'Production date', value: '30/02/2027' },
  ] as DmsEcuField[],
}
