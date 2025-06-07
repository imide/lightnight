import { atom } from 'jotai'

export interface LocationState {
  hasPermission: boolean
  isUsingLocation: boolean
  locationData: GeolocationPosition | null
  error: string | null
}

export const locationAtom = atom<LocationState>({
  hasPermission: false,
  isUsingLocation: false,
  locationData: null,
  error: null
})

export const updateLocationAtom = atom(null, (get, set, update: Partial<LocationState>) => {
  const current = get(locationAtom)
  set(locationAtom, { ...current, ...update})
})
