import type { IIsReactNative } from './IIsReactNative'

interface IPackageJson {
  dependencies: {
    [key: string]: string
  }
}

export default async function isReactNative({
  filesystem,
}: IIsReactNative): Promise<void | boolean> {
  const packageJson: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  if (packageJson) return !!packageJson.dependencies['react-native']
}
