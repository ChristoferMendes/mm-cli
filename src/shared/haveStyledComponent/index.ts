import { IHaveStyledComponent } from './haveStyledComponent'

interface IPackageJson {
  dependencies: {
    [key: string]: string
  }
}

export async function haveStyledComponent({
  filesystem,
}: IHaveStyledComponent): Promise<boolean> {
  const packageJson: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  if (packageJson) return !!packageJson.dependencies['styled-components']
}
