// All mock data for the visual prototype. No backend — values are static or
// locally simulated so screens can be demoed with/without faults.

export type Severity = 'critical' | 'warning' | 'info'

export interface Dtc {
  code: string
  system: string
  description: string
  severity: Severity
  status: 'active' | 'pending' | 'stored'
  freezeFrame: { label: string; value: string }[]
}

export interface Pid {
  id: string
  name: string
  unit: string
  value: number
  min: number
  max: number
}

export interface EcuInfo {
  name: string
  address: string
  protocol: string
  swVersion: string
  hwVersion: string
  online: boolean
}

export const vehicle = {
  vin: 'WMX123AB4CD567890',
  model: 'LPS Test Rig — Powertrain',
  year: 2026,
  odometer: 48213,
  lastScan: '2026-09-09 14:22',
}

export const ecus: EcuInfo[] = [
  { name: 'Engine Control Module', address: '0x7E0', protocol: 'UDS / DoIP', swVersion: 'ECM_4.11.2', hwVersion: 'A3', online: true },
  { name: 'Transmission Control', address: '0x7E1', protocol: 'UDS / DoIP', swVersion: 'TCU_2.7.0', hwVersion: 'B1', online: true },
  { name: 'Battery Management', address: '0x7E4', protocol: 'UDS / DoIP', swVersion: 'BMS_9.3.1', hwVersion: 'C2', online: true },
  { name: 'Brake Control Module', address: '0x760', protocol: 'UDS / CAN', swVersion: 'BCM_1.4.8', hwVersion: 'A1', online: false },
]

export const dtcs: Dtc[] = [
  {
    code: 'P0301',
    system: 'Engine',
    description: 'Cylinder 1 Misfire Detected',
    severity: 'critical',
    status: 'active',
    freezeFrame: [
      { label: 'Engine Speed', value: '2140 rpm' },
      { label: 'Coolant Temp', value: '92 °C' },
      { label: 'Load', value: '48 %' },
      { label: 'Vehicle Speed', value: '64 km/h' },
    ],
  },
  {
    code: 'P0420',
    system: 'Emissions',
    description: 'Catalyst System Efficiency Below Threshold (Bank 1)',
    severity: 'warning',
    status: 'pending',
    freezeFrame: [
      { label: 'O2 Sensor B1S2', value: '0.71 V' },
      { label: 'Coolant Temp', value: '89 °C' },
    ],
  },
  {
    code: 'U0121',
    system: 'Network',
    description: 'Lost Communication With ABS Control Module',
    severity: 'warning',
    status: 'stored',
    freezeFrame: [{ label: 'Bus', value: 'CAN-C' }],
  },
  {
    code: 'B1318',
    system: 'Body',
    description: 'Battery Voltage Low',
    severity: 'info',
    status: 'stored',
    freezeFrame: [{ label: 'Battery', value: '11.4 V' }],
  },
]

export const pids: Pid[] = [
  { id: 'rpm', name: 'Engine Speed', unit: 'rpm', value: 840, min: 0, max: 7000 },
  { id: 'coolant', name: 'Coolant Temperature', unit: '°C', value: 91, min: -40, max: 130 },
  { id: 'maf', name: 'Mass Air Flow', unit: 'g/s', value: 4.2, min: 0, max: 300 },
  { id: 'throttle', name: 'Throttle Position', unit: '%', value: 14.5, min: 0, max: 100 },
  { id: 'stft', name: 'Short Term Fuel Trim', unit: '%', value: 2.1, min: -25, max: 25 },
  { id: 'batt', name: 'Battery Voltage', unit: 'V', value: 14.1, min: 0, max: 16 },
]

export const trend = Array.from({ length: 40 }, (_, i) => ({
  t: i,
  rpm: 800 + Math.round(Math.sin(i / 4) * 120 + (i > 20 ? 600 : 0)),
  coolant: 60 + Math.min(35, i * 0.9),
}))

export interface DmsEcuField {
  label: string
  value: string
}

export const dms = {
  title: 'DMS Diagnostic Software',
  featureName: 'Advanced Driver Distraction Warning',
  demoMode: true,
  memory: { active: 1, inactive: 3 },
  modeOfEcu: 'Shipping Mode',
  ecuData: [
    { label: 'Part Number', value: '884 112 240 0' },
    { label: 'Software Version', value: '1.1' },
    { label: 'Hardware Number', value: '—' },
    { label: 'Parameter File', value: '01.02.10' },
    { label: 'Serial Number', value: '2025111900001' },
    { label: 'Production Date', value: '12/25/2025' },
  ] as DmsEcuField[],
}

export interface TestStep {
  id: number
  title: string
  detail: string
  state: 'done' | 'active' | 'todo'
}

export const guidedTest = {
  name: 'Ignition Coil — Cylinder 1',
  steps: [
    { id: 1, title: 'Preconditions', detail: 'Engine off, ignition on, battery > 12.4 V', state: 'done' },
    { id: 2, title: 'Actuate coil 1', detail: 'Command 5 pulses at 2 Hz and observe primary current', state: 'active' },
    { id: 3, title: 'Measure secondary resistance', detail: 'Expected 6–9 kΩ', state: 'todo' },
    { id: 4, title: 'Compare against known-good', detail: 'Deviation must be < 15 %', state: 'todo' },
    { id: 5, title: 'Result & report', detail: 'Attach readings to the session report', state: 'todo' },
  ] as TestStep[],
}
