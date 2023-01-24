import { Toolbox } from 'gluegun/build/types/domain/toolbox'

export interface ITreatProps {
  name: string
  extension: 'ts' | 'js'
}

export interface TreatPropsReturn {
  name: string
  extension: string
  native: string
}
