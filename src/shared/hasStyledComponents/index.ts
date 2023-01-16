import { IHasStyledComponents } from './haveStyledComponents'

interface IPackageJson {
  dependencies: {
    [key: string]: string
  }
}

export async function hasStyledComponents({
  filesystem,
}: IHasStyledComponents): Promise<boolean> {
  const packageJson: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  if (packageJson) return !!packageJson.dependencies['styled-components']
}
