import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { timer } from '../shared/classes/Timer'

module.exports = {
  name: 'git-check',
  description: 'Print your current git credentials',
  alias: 'check',
  run: async (toolbox: Toolbox) => {
    const { system, print } = toolbox
    timer.start()

    const name = await system.run('git config user.name')
    const email = await system.run(`git config user.email`)

    const namePrint = print.colors.cyan(name.trim())
    const emailPrint = print.colors.cyan(email.trim())
    print.success('These are your current git credentials.')
    print.info(`User name: ${namePrint}`)
    print.info(`User email: ${emailPrint}`)
    return timer.printDuration()
  },
} as Command
