import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { prisma } from '../prisma'

module.exports = {
  name: 'check-configs',
  description: 'Check the current status of all your configs saved',
  run: async (toolbox: Toolbox) => {
    const { print } = toolbox

    const defaultObject = { notIndex: undefined }

    const { notIndex } =
      (await prisma.defaultConfig.findFirst()) || defaultObject

    if (notIndex === undefined) {
      return print.error('You do not stored any config yet')
    }

    return print.success({ notIndex })
  },
} as Command
