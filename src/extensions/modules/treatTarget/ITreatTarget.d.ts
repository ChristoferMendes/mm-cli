import { Toolbox } from 'gluegun/build/types/domain/toolbox'

export interface ITreatTarget {
  toolbox: Toolbox
  folder: `src/${string}`
  name: string
}
