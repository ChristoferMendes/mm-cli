import { PrismaClient } from '@prisma/client'
import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'

const prisma = new PrismaClient()

module.exports = {
  name: 'whoami',
  description: 'Show your credentials stored',
  run: async (toolbox: Toolbox) => {
    const { print, system } = toolbox
    const timeElapsedInMs = system.startTimer()

    const user = await prisma.user.findFirst()

    print.info(`Name: ${user.name}.`)
    print.info(`Email: ${user.email}.`)
    print.newline()
    print.info(
      `Done in ${print.colors.cyan(
        String((timeElapsedInMs() / 1000).toFixed(2))
      )} seconds.`
    )
  },
} as Command
