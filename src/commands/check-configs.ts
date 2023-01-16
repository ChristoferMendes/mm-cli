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

    const defaultObject = { notIndex: undefined }

    const { notIndex } =
      (await prisma.defaultConfig.findFirst()) || defaultObject

    if (notIndex === undefined) {
      return print.error('You do not stored any config yet')
    }
    print.success({ notIndex })
    print.newline()
    return print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
