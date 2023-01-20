import { system, filesystem } from 'gluegun'
import { prisma } from '../src/prisma/'
import { user } from './mocks/credentials/userBase.json'

const src = filesystem.path(__dirname, '..')

const { name, email, availableRepository } = user

const cli = async (cmd: string) =>
  system.run('node ' + filesystem.path(src, 'bin', 'mm') + ` ${cmd}`)

describe('Git commands', () => {
  describe('Command git-config', () => {
    it('should update the local git credentials', async () => {
      const initialName = (await system.run('git config user.name')).trim()
      const initialEmail = (await system.run('git config user.email')).trim()

      const output = await cli(`git-config ${name} ${email}`)
      expect(output).toContain('Git configs changed!')

      const initialConfigCommand = `git-config ${initialEmail} ${initialName}`

      await cli(initialConfigCommand)
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
        `git-clone ${availableRepository} --name ${name}`
      )

      await system.run(`rm -rf ${availableRepository}`)
      expect(output).toMatch('Cloned your repository with success!')
      expect(output).toMatch(`${availableRepository}`)
    })
  })

  describe('Command git-rm-repo', () => {
    it('should remove the last repository cloned', async () => {
      await cli(`git-clone --name ${name} box-shadow-generator`)

      const output = await cli('rm-repo')
      expect(output).toContain('Repository box-shadow-generator deleted!')
    })
  })

  describe('Command git-config', () => {
    it('should not break the command flow', async () => {
      const user = await prisma.user.findFirst()

      if (!user) {
        expect(user).toBe(null)
        const output = await cli('git-config --flagThatDoesNotExist')
        return expect(output).toContain(
          "You don't passed any name or email, neither have your credentials stored"
        )
      }

      expect(user).not.toBe(null)
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('email')

      const output = await cli('git-config')
      expect(output).toContain(`Git configs changed!`)
    })
  })

  describe('Command git-check', () => {
    it('should not break the command flow', async () => {
      const output = await cli('git-check --flagThatDoesNotExist')

      expect(output).not.toBeInstanceOf(Error)
    })
  })
})
