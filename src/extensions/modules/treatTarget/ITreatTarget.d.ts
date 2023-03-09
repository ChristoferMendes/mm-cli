export interface ITreatTarget {
  folder: `src/${string}`
  name: string | undefined
  notIndexIsPresent: boolean
  extension: 'ts' | 'js'
}
