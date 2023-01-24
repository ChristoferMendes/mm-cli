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
      expect(output.toString()).toContain('GENERATED')
      const fileCreated = filesystem.read(`${pageFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
    })
  })

  describe('Generate component file', () => {
    it('should create a file in src/components/HomeTest', async () => {
      const output = await cli('generate-component HomeTest --index')

      expect(output).toContain('GENERATED')

      const fileCreated = filesystem.read(`${componentFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
    })
  })

  describe('Generate screen file', () => {
    it('should create a file in src/screens/HomeTest', async () => {
      const output = await cli('generate-screen HomeTest --index')

      expect(output).toContain('GENERATED')

      const fileCreated = filesystem.read(`${screenFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
    })
  })

  describe('Generate react-native file', () => {
    it('should create a file with react native setup', async () => {
      await system.exec('mv package.json packageMain.json')
      await system.exec(
        'cp ./__tests__/mocks/package.json/mock-rn.json ./package.json'
      )

      const output = await cli('gen-page HomeTest --index')

      await system.exec('rm -rf package.json')
      await system.exec('mv packageMain.json package.json')

      expect(output).toContain('GENERATED')

      const fileCreated = filesystem.read(`${pageFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
      expect(fileCreated).toContain('<View>')
    })
  })

  describe('Generate styled-component file', () => {
    it('should create a file with styled-component setup', async () => {
      await system.exec('mv package.json packageMain.json')
      await system.exec(
        'cp ./__tests__/mocks/package.json/mock-styled-components.json ./package.json'
      )
      const output = await cli('gen-page HomeTest --index')

      await system.exec('rm -rf package.json')
      await system.exec('mv packageMain.json package.json')

      expect(output).toContain('GENERATED')

      const styleFileCreated = filesystem.read(`${pageFilePath}/styles.ts`)
      expect(styleFileCreated).toContain(
        'export const Container = styled.div``'
      )

      const fileCreated = filesystem.read(`${pageFilePath}/index.tsx`)
      expect(fileCreated).toContain('<Container>')
    })
  })

  describe('Generate react-native with styled-component file', () => {
    it('should create a react-native file with styled-component', async () => {
      await system.exec('mv package.json packageMain.json')
      await system.exec(
        'cp ./__tests__/mocks/package.json/mock-rn-and-styled-components.json ./package.json'
      )

      const output = await cli('gen-page HomeTest --index')
      await system.exec('rm -rf package.json')
      await system.exec('mv packageMain.json package.json')

      expect(output).toContain('GENERATED')

      const styleFileCreated = filesystem.read(`${pageFilePath}/styles.ts`)
      expect(styleFileCreated).toContain(
        'export const Container = styled.View``'
      )

      const fileCreated = filesystem.read(`${pageFilePath}/index.tsx`)
      expect(fileCreated).toContain("import { Text } from 'react-native';")
      expect(fileCreated).toContain('<Container>')
    })
  })

  describe('Generate native-base file', () => {
    it('should create a file with native-base setup', async () => {
      await system.exec('mv package.json packageMain.json')
      await system.exec(
        'cp ./__tests__/mocks/package.json/mock-native-base.json ./package.json'
      )
      const output = await cli('gen-screen HomeTest --index')

      expect(output).toContain('GENERATED')

      const fileCreated = filesystem.read(`${screenFilePath}/index.tsx`)

      expect(fileCreated).toContain("import { View, Text } from 'native-base';")
      expect(fileCreated).toContain('<View>')

      await system.exec('rm -rf package.json')
      await system.exec('mv packageMain.json package.json')
    })
  })
})
