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
      const output = await cli('generate-page HomeTest')
      expect(output).toContain(
        'Generated HomeTest file at src/pages/HomeTest/index.tsx!'
      )
      const fileCreated = filesystem.read(`${pageFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
    })
  })

  describe('Generate component file', () => {
    it('should create a file in src/components/HomeTest', async () => {
      const output = await cli('generate-component HomeTest')

      expect(output).toContain(
        'Generated HomeTest file at src/components/HomeTest/index.tsx'
      )

      const fileCreated = filesystem.read(`${componentFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
    })
  })

  describe('Generate screen file', () => {
    it('should create a file in src/screens/HomeTest', async () => {
      const output = await cli('generate-screen HomeTest')

      expect(output).toContain(
        'Generated HomeTest file at src/screens/HomeTest/index.tsx'
      )

      const fileCreated = filesystem.read(`${screenFilePath}/index.tsx`)
      expect(fileCreated).toContain('export function HomeTest()')
    })
  })
})
