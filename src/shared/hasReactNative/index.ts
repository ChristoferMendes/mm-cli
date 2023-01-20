import type { IHasReactNative } from './IHasReactNative'

interface IPackageJson {
  dependencies: {
    [key: string]: string
  }
}

export default async function hasReactNative({
  filesystem,
}: IHasReactNative): Promise<void | boolean> {
  const packageJson: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  if (packageJson) return !!packageJson.dependencies['react-native']
}