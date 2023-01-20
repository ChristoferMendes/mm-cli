import { GluegunToolbox } from 'gluegun'
import { prisma } from '../prisma'
import { isHelpOption } from '../shared/isHelpOption'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'git-config',
  description:
    'Configures git credentials (If you have credentials stored, this command you set them as your git configurations)',
  alias: 'config',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, system, print, createHelp } = toolbox
    const timeElapsedInMs = system.startTimer()

    const haveHelp = isHelpOption(parameters.options)

    if (haveHelp) {
      createHelp({
        options: [
          {
            flag: '--name',
            description:
              'Pass the name you want after this flag (optional, if you pass any non-email string, it will understand as your name)',
          },
          {
            flag: '--email',
            description:
              'Pass the email you want after this flag (optional, if you pass any email string, it wil understand as your email)',
          },
        ],
        commandName: 'git-config',
        alias: 'config',
        description: 'Configures your git credentials',
      })
      print.newline()
      print.info(
        `Done in ${print.colors.cyan(
          String((timeElapsedInMs() / 1000).toFixed(2))
        )} seconds.`
      )
      return
    }

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i

    const [emailFromCli] = parameters.array.filter(
      (item) => item.match(emailRegex) ?? item
    )

    const [nameFromCli] = parameters.array.filter(
      (item) => !item.match(emailRegex)
    )

    const user = await prisma.user.findFirst()

    const nameUsed = nameFromCli ?? user?.name
    const emailUsed = emailFromCli ?? user?.email

    if (!nameUsed || !emailUsed) {
      print.error(
        "You don't passed any name or email, neither have your credentials stored."
      )
      const storeMeCommand = print.colors.cyan('$ mm store-me <name> <email>')
      print.info(`Please, type ${storeMeCommand}`)

      const gitConfigCommand = print.colors.cyan(
        '$ mm git-config <name> <email>'
      )

      print.info(`Or, ${gitConfigCommand}`)
      print.newline()
      return print.info('Done in ' + timerString(timeElapsedInMs))
    }

    system.exec(`git config user.name ${nameUsed}`)
    system.exec(`git config user.email ${emailUsed}`)

    const namePrint = print.colors.cyan(nameUsed)
    const emailPrint = print.colors.cyan(emailUsed)

    print.success(`Git configs changed!`)
    print.info(`User name: ${namePrint}`)
    print.info(`User email: ${emailPrint}`)
    print.newline()
    return print.info('Done in ' + timerString(timeElapsedInMs))
  },
}
