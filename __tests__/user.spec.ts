import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')

const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'mm') + ` ${cmd}`)

describe('User tests.', () => {
  describe('Command store-me', () => {
    it('should store or update the user credentials, if already set', async () => {
      const output = await cli('store-me testName testuser@gmail.com')
      expect(output).not.toContain('At least name or email must be specified')
    })
  })

  describe('Command whoami', () => {
    it('should print who the user are', async () => {
      const output = await cli('whoami')
      expect(output).toContain('Name: ')
      expect(output).toContain('Email: ')
    })
  })

  describe('Command update-me', () => {
    it('should update the user credentials', async () => {
      const output = await cli(
        'update-me ChristoferMendes christoferluizdsm@gmail.com'
      )
      expect(output).not.toContain('At least name or email must be specified')
    })
  })

  describe('Command check-configs', () => {
    it('should list the user configs', async () => {
      await cli('configs --not-i=true')
      const output = await cli('check-configs')
      expect(output).toContain('notIndex: true')
    })
  })
})
