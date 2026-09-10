// Vehicle catalog for the Authoring Tool — step 1 "Select vehicle".
// Visual-only: `front` picks the front-connector glyph, `axleGroups` lists the
// axle groups from front to rear (e.g. [1, 2] = a single axle then a tandem).

export type TrailerFront = 'drawbar' | 'gooseneck' | 'rigid'

export interface VehicleOption {
  id: string
  front: TrailerFront
  axleGroups: number[]
}

export interface VehicleGroup {
  id: string
  label: string
  options: VehicleOption[]
}

export const vehicleGroups: VehicleGroup[] = [
  {
    id: 'drawbar',
    label: 'Drawbar trailer',
    options: [
      { id: 'drawbar-1-1', front: 'drawbar', axleGroups: [1, 1] },
      { id: 'drawbar-1-2', front: 'drawbar', axleGroups: [1, 2] },
      { id: 'drawbar-1-3', front: 'drawbar', axleGroups: [1, 3] },
      { id: 'drawbar-2-2', front: 'drawbar', axleGroups: [2, 2] },
    ],
  },
  {
    id: 'semitrailer',
    label: 'Semitrailers',
    options: [
      { id: 'semi-1', front: 'gooseneck', axleGroups: [1] },
      { id: 'semi-2', front: 'gooseneck', axleGroups: [2] },
      { id: 'semi-3', front: 'gooseneck', axleGroups: [3] },
      { id: 'semi-4', front: 'gooseneck', axleGroups: [4] },
    ],
  },
  {
    id: 'central-axle',
    label: 'Central axle trailer',
    options: [
      { id: 'central-1', front: 'rigid', axleGroups: [1] },
      { id: 'central-2', front: 'rigid', axleGroups: [2] },
      { id: 'central-3', front: 'rigid', axleGroups: [3] },
    ],
  },
]
