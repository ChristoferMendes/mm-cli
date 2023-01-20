import { IPackageJson } from '../PackageJsonInterface'
import { IHasTypescript } from './IHasTypescript'

export async function hasTypescript({
  filesystem,
}: IHasTypescript): Promise<boolean> {
  const packageJson: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  if (packageJson) return !!packageJson.devDependencies['typescript']
}
