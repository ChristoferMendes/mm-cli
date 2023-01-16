import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { prisma } from '../prisma'
import { isHelpOption } from '../shared/isHelpOption'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'store-me',
  description:
    'Store your git credentials (default is your local git credentials)',
  run: async (toolbox: Toolbox) => {
    const { parameters, print, system, createHelp } = toolbox
    const timeElapsedInMs = system.startTimer()

    const haveHelp = isHelpOption(parameters.options)

    if (haveHelp) {
      createHelp({
        commandName: 'store-me',
        description: 'store your credentials to be used in many other commands',
        example: '$ mm store-me john johndoe@gmail.com',
      })
      print.newline()
      return print.info(timerString(timeElapsedInMs))
    }

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i

    const [name] = parameters.array.filter((item) => !item.match(emailRegex))
    const [email] = parameters.array.filter((item) => item.match(emailRegex))

    if (!name || !email) {
      return print.error('Name and email must be specified to create')
    }

    const user = await prisma.user.findFirst()
    if (user) {
      print.info(
        'Your already have your credentials stored. To update them, please type $ mm update-me <name> <email>'
      )
      print.newline()
      return print.info('Done in ' + timerString(timeElapsedInMs))
    }

    await prisma.user.create({
      data: {
        name,
        email,
      },
    })

    print.success('Your credentials are stored')
    print.info(`Name: ${user.name}`)
    print.info(`Email: ${user.email}`)
    print.newline()
    return print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
