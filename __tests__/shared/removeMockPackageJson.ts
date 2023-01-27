import { system } from 'gluegun'

export async function removeMockedPackageJson(): Promise<void> {
  await system.exec('rm -rf package.json')
  await system.exec('mv packageMain.json package.json')
}
