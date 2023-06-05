import { hasDependency } from '../../../shared/hasPackage'
import { ITreatProps, TreatPropsReturn } from './ITreatProps'

export async function treatProps({
  name,
  extension,
}: ITreatProps): Promise<TreatPropsReturn> {
  const nativeBaseIsPresent = await hasDependency('native-base')

  const native = nativeBaseIsPresent ? 'native-base' : 'react-native'

  return { name, extension, native }
}
