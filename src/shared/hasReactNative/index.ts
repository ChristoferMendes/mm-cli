import { filesystem } from 'gluegun'
import { IPackageJson } from '../PackageJsonInterface'

export default async function hasReactNative(): Promise<void | boolean> {
  const packageJson: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  if (packageJson) return !!packageJson.dependencies['react-native']
}
