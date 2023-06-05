import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { prisma } from '../prisma'
import { timer } from '../shared/classes/Timer'

module.exports = {
  name: 'whoami',
  description: 'Show your credentials stored',
  alias: 'i',
  run: async (toolbox: Toolbox) => {
    const { print } = toolbox
    timer.start()

    const user = await prisma.user.findFirst()

    if (!user) {
      print.info('Your credentials are not stored yet')
      print.info(
        `Please, type ${print.colors.cyan(
          'mm store-me <your-name> <your-email>'
        )}`
      )
      return timer.printDuration()
    }

    print.info(`Name: ${user?.name}.`)
    print.info(`Email: ${user?.email}.`)
    return timer.printDuration()
  },
} as Command
