import { filesystem } from 'gluegun'
import { IPackageJson } from '../PackageJsonInterface'

export async function hasTypescript(): Promise<boolean> {
  const packageJson: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  return !!packageJson?.devDependencies['typescript']
}
