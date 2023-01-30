import { system, filesystem } from 'gluegun'
import { moveMockedPackageJson } from './shared/moveMockPackageJson'
import { removeMockedPackageJson } from './shared/removeMockPackageJson'

const src = filesystem.path(__dirname, '..')

const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'mm') + ` ${cmd}`)

const pageFilePath = filesystem.path('src/pages/HomeTest/')
const componentFilePath = filesystem.path('src/components/HomeTest/')
const screenFilePath = filesystem.path('src/screens/HomeTest/')

const notIndexPageFile = filesystem.path('src/pages/HomeTestNotIndex/')

afterEach(() => {
  ;[pageFilePath, componentFilePath, screenFilePath, notIndexPageFile].forEach(
    (item) => filesystem.remove(item)
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
      await moveMockedPackageJson({ mockedJson: 'mock-rn.json' })

      const output = await cli('gen-page HomeTest --index')

      await removeMockedPackageJson()

      expect(output).toContain('GENERATED')

      const fileCreated = filesystem.read(`${pageFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
      expect(fileCreated).toContain('<View>')
    })
  })

  describe('Generate styled-component file', () => {
    it('should create a file with styled-component setup', async () => {
      await moveMockedPackageJson({ mockedJson: 'mock-styled-components.json' })
      const output = await cli('gen-page HomeTest --index')

      await removeMockedPackageJson()

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
      await moveMockedPackageJson({
        mockedJson: 'mock-rn-and-styled-components.json',
      })

      const output = await cli('gen-page HomeTest --index')
      await removeMockedPackageJson()

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
      await moveMockedPackageJson({ mockedJson: 'mock-native-base.json' })
      const output = await cli('gen-screen HomeTest --index')
      await removeMockedPackageJson()

      expect(output).toContain('GENERATED')

      const fileCreated = filesystem.read(`${screenFilePath}/index.tsx`)

      expect(fileCreated).toContain("import { View, Text } from 'native-base';")
      expect(fileCreated).toContain('<View>')
    })
  }),
    describe('Generating files with --not-index', () => {
      describe('Generate page', () => {
        it('should create a file in src/page/HomeTest/HomeTestNotIndex.tsx', async () => {
          const output = await cli('gen-page HomeTestNotIndex --not-index')
          expect(output).toContain('GENERATED')

          const fileCreated = filesystem.read(
            `${notIndexPageFile}/HomeTestNotIndex.tsx`
          )
          const indexExportedFileCreated = filesystem.read(
            `${notIndexPageFile}/index.tsx`
          )

          expect(indexExportedFileCreated).toContain(
            "import { HomeTestNotIndex } from './HomeTestNotIndex'"
          )
          expect(indexExportedFileCreated).not.toContain(
            "import styled from 'styled-components'"
          )
          expect(indexExportedFileCreated).not.toContain(
            'export function HomeTestNotIndex()'
          )

          expect(fileCreated).toContain('export function HomeTestNotIndex()')
        })
      })

      describe('Generate styled-components file', () => {
        it('should create a file with styled-component setup', async () => {
          await moveMockedPackageJson({
            mockedJson: 'mock-styled-components.json',
          })
          const output = await cli('gen-page HomeTestNotIndex --not-index')

          await removeMockedPackageJson()

          expect(output).toContain('GENERATED')

          const styledComponentsFileCreated = filesystem.read(
            `${notIndexPageFile}/styles.ts`
          )

          expect(styledComponentsFileCreated).toContain(
            "import styled from 'styled-components'"
          )
          expect(styledComponentsFileCreated).not.toContain('function')
        })
      })

      describe('Generate react-native file', () => {
        it('should create a file with react-native setup', async () => {
          await moveMockedPackageJson({
            mockedJson: 'mock-rn.json',
          })

          const output = await cli('gen-page HomeTestNotIndex --not-index')
          await removeMockedPackageJson()

          expect(output).not.toContain('Name must be specified')
          expect(output).toContain('GENERATED')

          const fileCreated = filesystem.read(
            `${notIndexPageFile}/HomeTestNotIndex.tsx`
          )

          expect(fileCreated).toContain(
            "import { View, Text } from 'react-native'"
          )
          expect(fileCreated).toContain('export function HomeTestNotIndex()')

          const styledComponentFile = filesystem.read(
            `${notIndexPageFile}/styles.tsx`
          )
          expect(styledComponentFile).toBe(undefined)
        })
      })

      describe('Generate react native with styled components files', () => {
        it('should create a file with react-native and styled components setup', async () => {
          await moveMockedPackageJson({
            mockedJson: 'mock-rn-and-styled-components.json',
          })

          const output = await cli('gen-page HomeTestNotIndex --not-index')

          await removeMockedPackageJson()

          expect(output).toContain('GENERATED')

          const fileCreated = filesystem.read(
            `${notIndexPageFile}/HomeTestNotIndex.tsx`
          )
          expect(fileCreated).not.toBe(undefined)
          expect(fileCreated).toContain(
            "import { Container } from './styles.ts'"
          )
          expect(fileCreated).toContain("import { Text } from 'react-native'")
          expect(fileCreated).toContain('export function HomeTestNotIndex()')
        })
      }),
        describe('Generate a native base file with styled-components', () => {
          it('should create a file with native-base and styled-components setup', async () => {
            await moveMockedPackageJson({
              mockedJson: 'mock-native-base-styled-components.json',
            })

            await cli('gen-page HomeTestNotIndex --not-index')

            await removeMockedPackageJson()
            const fileCreated = filesystem.read(
              `${notIndexPageFile}/HomeTestNotIndex.tsx`
            )

            expect(fileCreated).toContain('export function HomeTestNotIndex()')

            expect(fileCreated).toContain("import { Text } from 'native-base'")

            const styledComponentFileCreated = filesystem.read(
              `${notIndexPageFile}/styles.ts`
            )

            console.log(styledComponentFileCreated)

            expect(styledComponentFileCreated).toContain(
              "import styled from 'styled-components/native'"
            )
            expect(styledComponentFileCreated).toContain(
              'export const Container = styled.View``'
            )
          })
        })
    })
})
