// All mock data for the visual prototype. No backend — values are static.

export interface DmsEcuField {
  label: string
  value?: string
}

export const dms = {
  windowTitle: 'ZF [pro]Diagnostics Suite Stg Demo V1.65.0',
  title: 'DMS Diagnostic Software',
  featureName: 'Advanced Driver Distraction Warning',
  demoMode: true,
  zoomLabel: '…NN TDTGG2',
  tabs: ['OVERVIEW', 'DIAGNOSTIC MEMORY', 'CONTROL', 'SYSTEM'] as const,
  memory: { active: 1, inactive: 3 },
  ecuData: [
    { label: 'Mode of ECU', value: 'Shipping Mode' },
    { label: 'Part Number', value: '884 112 240 0' },
    { label: 'Software Version', value: '1.1' },
    { label: 'Hardware Number' },
    { label: 'Parameter File', value: '01.02.10' },
    { label: 'Serial Number', value: '2025111900001' },
    { label: 'Production Date', value: '12/25/2025' },
  ] as DmsEcuField[],
}
