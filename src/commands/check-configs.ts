import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { prisma } from '../prisma'

module.exports = {
  name: 'check-configs',
  description: 'Check the current status of all your configs saved',
  run: async (toolbox: Toolbox) => {
    const { print } = toolbox

    const defaultObject = { id: 0, index: true }

    const { id, ...rest } =
      (await prisma.defaultConfig.findFirst()) ?? defaultObject

    print.success(rest)
  },
} as Command
