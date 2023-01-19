import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')

afterAll(async () => {
  await cli('git-config ChristoferMendes christoferluizdsm@gmail.com')
})

const cli = async (cmd: string) =>
  system.run('node ' + filesystem.path(src, 'bin', 'mm') + ` ${cmd}`)

describe('Git commands', () => {
  describe('Command git-config', () => {
    it('should update the local git credentials', async () => {
      const output = await cli('git-config test test@gmail.com')
      expect(output).toContain('Git configs changed!')
    })
  })

  describe('Command git-check', () => {
    it('should list the local git credentials', async () => {
      const output = await cli('git-check')
      expect(output).toContain('These are your current git credentials')
    })
  })

  describe('Command git-clone', () => {
    it('should clone a repository', async () => {
      const output = await cli(
        'git-clone box-shadow-generator --name ChristoferMendes'
      )

      await system.run('rm -rf box-shadow-generator')
      expect(output).toMatch('Cloned your repository with success!')
      expect(output).toMatch('box-shadow-generator')
    })
  })

  describe('Command git-rm-repo', () => {
    it('should remove the last repository cloned', async () => {
      await cli('git-clone --name ChristoferMendes box-shadow-generator')

      const output = await cli('rm-repo')
      expect(output).toContain('Repository box-shadow-generator deleted!')
    })
  })
})
