import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { prisma } from '../prisma'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'update-me',
  description: 'Update your credentials',
  run: async (toolbox: Toolbox) => {
    const { system, parameters, print } = toolbox
    const timeElapsedInMs = system.startTimer()

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i

    const [name] = parameters.array.filter((item) => !item.match(emailRegex))
    const [email] = parameters.array.filter((item) => item.match(emailRegex))

    if (!name && !email) {
      return print.error('At least name or email must be specified')
    }

    const oldUser = await prisma.user.findFirst()
    if (!oldUser) print.error('You do not have any credentials stored yet')

    const newUser = await prisma.user.update({
      where: { id: oldUser.id },
      data: {
        email: email ?? oldUser.email,
        name: name ?? oldUser.name,
      },
    })

    print.success('Credentials updated')
    const defineNameChanged = name
      ? print.colors.cyan(newUser.name)
      : newUser.name

    const defineEmailChange = email
      ? print.colors.cyan(newUser.email)
      : newUser.email

    print.info(`Name: ${defineNameChanged}.`)
    print.info(`Email: ${defineEmailChange}.`)
    print.newline()
    return print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
