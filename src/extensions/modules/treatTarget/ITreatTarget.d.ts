import { Toolbox } from 'gluegun/build/types/domain/toolbox'

export interface ITreatTarget {
  folder: `src/${string}`
  name: string
  notIndexIsPresent: boolean
  extension: 'ts' | 'js'
}
