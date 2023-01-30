import { filesystem, system } from 'gluegun'

type moveMockedPackageJsonTypes =
  | 'mock-native-base.json'
  | 'mock-rn-and-styled-components.json'
  | 'mock-rn.json'
  | 'mock-styled-components.json'
  | 'mock-native-base-styled-components.json'

export async function moveMockedPackageJson({
  mockedJson,
}: {
  mockedJson: moveMockedPackageJsonTypes
}): Promise<void> {
  const mockedPackageJson = `./__tests__/mocks/package.json/${mockedJson}`
  const jsonMockedFile = filesystem.read(mockedPackageJson)

  if (!jsonMockedFile) throw new Error('Mock json file does not exist')

  await system.exec('mv package.json packageMain.json')
  await system.exec(`cp ${mockedPackageJson} ./package.json`)
}
