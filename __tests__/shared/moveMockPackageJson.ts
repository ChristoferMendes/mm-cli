import { filesystem, system } from 'gluegun'
// import { cli } from './cli'

export async function moveMockedPackageJson({
  mockedJson,
}: {
  mockedJson: `${string}.json`
}): Promise<void> {
  const path = `./__tests__/mocks/package.json/${mockedJson}`
  const jsonMockedFile = filesystem.read(path)

  if (!jsonMockedFile) throw new Error('Mock json file does not exist')

  await system.exec('mv package.json packageMain.json')
  await system.exec(`cp ${path} ./package.json`)
}
