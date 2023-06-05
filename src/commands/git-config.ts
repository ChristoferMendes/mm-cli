import { Toolbox } from '../@types/gluegun'
import { prisma } from '../prisma'
import { userConfig } from '../shared/classes/UserConfig'
import { hasHelpOtion } from '../shared/isHelpOption'
import { timer } from '../shared/classes/Timer'
import { ParametersUserCredentialsFilter } from '../shared/classes/ParametersUserCredentialsFilter'

module.exports = {
  name: 'git-config',
  description:
    'Configures git credentials (If you have credentials stored, this command you set them as your git configurations)',
  alias: 'config',
  run: async (toolbox: Toolbox) => {
    const { parameters, system, print, createHelp } = toolbox
    timer.start()

    const haveHelp = hasHelpOtion(parameters.options)

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

      return timer.printDuration()
    }

    const userCredentials = new ParametersUserCredentialsFilter(parameters)

    const { email, name } = userCredentials

    const { user } = userConfig.read()

    const nameUsed = name ?? user?.name
    const emailUsed = email ?? user?.email

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
      return timer.printDuration()
    }

    system.exec(`git config user.name ${nameUsed}`)
    system.exec(`git config user.email ${emailUsed}`)

    const namePrint = print.colors.cyan(nameUsed)
    const emailPrint = print.colors.cyan(emailUsed)

    print.success(`Git configs changed!`)
    print.info(`User name: ${namePrint}`)
    print.info(`User email: ${emailPrint}`)
    return timer.printDuration()
  },
}
