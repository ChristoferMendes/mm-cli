import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { prisma } from '../prisma'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'check-configs',
  description: 'Check the current status of all your configs saved',
  run: async (toolbox: Toolbox) => {
    const { print, system } = toolbox
    const timeElapsedInMs = system.startTimer()

    const { notIndex } = (await prisma.defaultConfig.findFirst()) ?? {}

    if (notIndex === undefined) {
      print.error('You do not stored any configuration yet')
      print.newline()
      return print.info('Done in ' + timerString(timeElapsedInMs))
    }

    print.success({ notIndex })
    print.newline()
    return print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
