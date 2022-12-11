import type { IIsReactNative } from './IIsReactNative'

export default async function isReactNative({
  filesystem,
}: IIsReactNative): Promise<boolean> {
  const packageJson = await filesystem.read('package.json', 'json')
  return !!packageJson.dependencies['react-native']
}
