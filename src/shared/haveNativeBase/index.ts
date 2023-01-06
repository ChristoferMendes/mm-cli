import { IHaveNativeBase } from './haveNativeBase'

interface IPackageJson {
  dependencies: {
    [key: string]: string
  }
}

export async function haveNativeBase({
  filesystem,
}: IHaveNativeBase): Promise<boolean> {
  const packageJson: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  if (packageJson) return !!packageJson.dependencies['native-base']
}
