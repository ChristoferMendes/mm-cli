import { Toolbox } from 'gluegun/build/types/domain/toolbox'

export interface ITreatProps {
  name: string
  toolbox: Toolbox
}

export interface TreatPropsReturn {
  name: string
  extension: string
  native: string
}
