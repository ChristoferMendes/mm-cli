import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { PrismaClient } from '../prisma/generated/client'

const prisma = new PrismaClient()

module.exports = {
  name: 'store-me',
  description:
    'Store your git credentials (default is your local git credentials)',
  run: async (toolbox: Toolbox) => {
    const { parameters, print, system } = toolbox
    const timeElapsedInMs = system.startTimer()
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i

    const name = parameters.array.filter((item) => !item.match(emailRegex))[0]
    const email = parameters.array.filter((item) => item.match(emailRegex))[0]

    if (!name && !email) {
      return print.error('At least name or email must be specified')
    }

    const user = await prisma.user.findFirst()
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: email ?? user.email,
          name: name ?? user.name,
        },
      })

      print.success('Credentials updated')
      print.newline()
      print.info(
        `Done in ${print.colors.cyan(
          String(timeElapsedInMs() / 1000)
        )} seconds.`
      )
      return
    }

    await prisma.user.create({
      data: {
        name,
        email,
      },
    })

    print.success('Your credentials are stored')
    print.newline()
    print.info(
      `Done in ${print.colors.cyan(
        String((timeElapsedInMs() / 1000).toFixed(2))
      )} seconds.`
    )
  },
} as Command
