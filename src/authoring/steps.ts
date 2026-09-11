// The authoring flow — one validated parameter set is built step by step, then
// published (Option D). Only step 1 is modelled so far.

export interface AuthoringStep {
  id: string
  label: string
}

export const authoringSteps: AuthoringStep[] = [
  { id: 'vehicle', label: 'Select vehicle' },
  { id: 'functions', label: 'Select Functions' },
  { id: 'abs', label: 'ABS layout' },
  { id: 'parameters', label: 'Parameters' },
  { id: 'publish', label: 'Publish' },
]
