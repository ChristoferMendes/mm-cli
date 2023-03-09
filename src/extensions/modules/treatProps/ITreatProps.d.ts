export interface ITreatProps {
  name: string | undefined
  extension: 'ts' | 'js'
}

export interface TreatPropsReturn {
  name: string | undefined
  extension: string
  native: string
}
