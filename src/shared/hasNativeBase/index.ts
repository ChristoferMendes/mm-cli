import { IHasNativeBase } from './hasNativeBase'

interface IPackageJson {
  dependencies: {
    [key: string]: string
  }
}

export async function hasNativeBase({
  filesystem,
}: IHasNativeBase): Promise<boolean> {
  const packageJson: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  if (packageJson) return !!packageJson.dependencies['native-base']
}
