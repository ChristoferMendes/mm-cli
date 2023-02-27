import { filesystem } from 'gluegun'
import { IPackageJson } from './PackageJsonInterface'

export const verifyProjectName = async (): Promise<boolean> => {
  const packageJSON: undefined | IPackageJson = await filesystem.read(
    'package.json',
    'json'
  )

  if (packageJSON) return packageJSON.name === 'mm-tec-cli'
}
