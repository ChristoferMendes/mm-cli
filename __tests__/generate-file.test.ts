import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')

const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'mm') + ` ${cmd}`)

const pageFilePath = filesystem.path('src/pages/HomeTest/')
const componentFilePath = filesystem.path('src/components/HomeTest/')
const screenFilePath = filesystem.path('src/screens/HomeTest/')

afterEach(() => {
  ;[pageFilePath, componentFilePath, screenFilePath].forEach((item) =>
    filesystem.remove(item)
  )
})

describe('Generate file tests', () => {
  describe('Generate page file', () => {
    it('should create a file in src/pages/HomeTest', async () => {
      const output = await cli('generate-page HomeTest --index')
      expect(output).toContain(
        'Generated HomeTest file at src/pages/HomeTest/index.tsx!'
      )
      const fileCreated = filesystem.read(`${pageFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
    })
  })

  describe('Generate component file', () => {
    it('should create a file in src/components/HomeTest', async () => {
      const output = await cli('generate-component HomeTest --index')

      expect(output).toContain(
        'Generated HomeTest file at src/components/HomeTest/index.tsx'
      )

      const fileCreated = filesystem.read(`${componentFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
    })
  })

  describe('Generate screen file', () => {
    it('should create a file in src/screens/HomeTest', async () => {
      const output = await cli('generate-screen HomeTest --index')

      expect(output).toContain(
        'Generated HomeTest file at src/screens/HomeTest/index.tsx'
      )

      const fileCreated = filesystem.read(`${screenFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
    })
  })

  describe('Generate react-native file', () => {
    it('should create a file with react native setup', async () => {
      const packageJson = await filesystem.read('package.json', 'json')
      if (!packageJson.dependencies['react-native']) {
        return console.log('You do not have react-native in your package.json')
      }
      const output = await cli('gen-page HomeTest --index')

      expect(output).toContain(
        'Generated HomeTest file at src/pages/HomeTest/index.tsx!'
      )

      const fileCreated = filesystem.read(`${pageFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
      expect(fileCreated).toContain('<View>')
    })
  })

  describe('Generate styled-component file', () => {
    it('should create a file with styled-component setup', async () => {
      // const mockedPackageJson = await filesystem.read(
      //   './mocks/mock.package.json',
      //   'json'
      // )
      // await system.exec('mv package.json packageMain.json')
      // await system.exec('cp ./__tests__/mocks/mock.package.json ./package.json')
      // const output = await cli('gen-page HomeTest --index')
      // expect(output).toContain(
      //   'Generated HomeTest file at src/pages/HomeTest/index.tsx'
      // )
    })
  })
})
