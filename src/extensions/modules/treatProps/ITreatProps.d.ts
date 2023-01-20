import { Toolbox } from 'gluegun/build/types/domain/toolbox'

export interface ITreatProps {
  name: string
  toolbox: Toolbox
  typescriptIsPresent: boolean
}

export interface TreatPropsReturn {
  name: string
  extension: string
  native: string
}
