import { IPackageJson } from '../PackageJsonInterface'
import { IHasStyledComponents } from './haveStyledComponents'

export async function hasStyledComponents({
  filesystem,
}: IHasStyledComponents): Promise<boolean> {
  const packageJson: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  if (packageJson) return !!packageJson.dependencies['styled-components']
}
