import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { prisma } from '../prisma'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'whoami',
  description: 'Show your credentials stored',
  alias: 'i',
  run: async (toolbox: Toolbox) => {
    const { print, system } = toolbox
    const timeElapsedInMs = system.startTimer()

    const user = await prisma.user.findFirst()

    if (!user) {
      print.info('Your credentials are not stored yet')
      print.info(
        `Please, type ${print.colors.cyan(
          'mm store-me <your-name> <your-email>'
        )}`
      )
      print.newline()
      return print.info('Done in ' + timerString(timeElapsedInMs))
    }

    print.info(`Name: ${user?.name}.`)
    print.info(`Email: ${user?.email}.`)
    print.newline()
    print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
