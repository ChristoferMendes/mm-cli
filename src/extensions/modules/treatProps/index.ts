import { hasNativeBase } from '../../../shared/hasNativeBase'
import { ITreatProps, TreatPropsReturn } from './ITreatProps'

export async function treatProps({
  name,
  extension,
}: ITreatProps): Promise<TreatPropsReturn> {
  const nativeBaseIsPresent = await hasNativeBase()

  const native = nativeBaseIsPresent ? 'native-base' : 'react-native'

  return { name, extension, native }
}
