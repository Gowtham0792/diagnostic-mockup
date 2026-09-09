# LPS Diagnostics — UI Mockup

Visual-only prototype of the diagnostic software. **No backend** — all data in
[`src/data/mock.ts`](src/data/mock.ts) is static or locally simulated.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v3
- lucide-react (icons), Recharts (charts)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Screens

| Route (sidebar) | File | Shows |
|---|---|---|
| Dashboard | `src/pages/Dashboard.tsx` | Status tiles, live trend chart, ECU grid, recent faults |
| Fault Codes | `src/pages/Faults.tsx` | DTC table + freeze-frame detail |
| Live Data | `src/pages/LiveData.tsx` | Simulated live PIDs with bar gauges (pause/resume) |
| Guided Tests | `src/pages/GuidedTest.tsx` | Step-by-step actuation flow |
| Report | `src/pages/Report.tsx` | Printable session summary |

Dark/light toggle in the header.

## Adjusting the mock

Edit `src/data/mock.ts` to change the vehicle, ECUs, fault codes, PIDs, trend
data, or the guided-test steps. To demo a "no faults" state, empty the `dtcs`
array.
