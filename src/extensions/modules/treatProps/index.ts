import { hasNativeBase } from '../../../shared/hasNativeBase'
import { ITreatProps, TreatPropsReturn } from './ITreatProps'

export async function treatProps({
  name,
  toolbox,
  typescriptIsPresent,
}: ITreatProps): Promise<TreatPropsReturn> {
  const extension = typescriptIsPresent ? 'ts' : 'js'
  const { filesystem } = toolbox

  const nativeBaseIsPresent = await hasNativeBase({
    filesystem,
  })

  const native = nativeBaseIsPresent ? 'native-base' : 'react-native'

  return { name, extension, native }
}
