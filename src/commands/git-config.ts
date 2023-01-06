import { GluegunToolbox } from 'gluegun'
import { PrismaClient } from '../prisma/generated/client'
import { isHelpOption } from '../shared/isHelpOption'
import { IGitConfigOptions } from '../shared/Options/Git-Config.options'

const prisma = new PrismaClient()

module.exports = {
  name: 'git-config',
  description: 'Configures git credentials',
  alias: 'config',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, system, print, createHelp } = toolbox
    const timeElapsedInMs = system.startTimer()

    const { name, email } = parameters.options as IGitConfigOptions
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
        alias: 'g-conf',
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

    const emailWithoutOptions = parameters.array.filter((item) =>
      item.match('@')
    )
    const nameWithoutOptions = parameters.array.filter(
      (item) => !item.match('@')
    )

    const user = await prisma.user.findFirst()

    const verifyIfNameIsString = typeof name === 'string'
    const verifyIfEmailIsString = typeof email === 'string'

    const nameThatComeFromCli = verifyIfNameIsString
      ? name
      : nameWithoutOptions[0]

    const emailThatComeFromCli = verifyIfEmailIsString
      ? email
      : emailWithoutOptions[0]

    const nameUsed = nameThatComeFromCli ?? user.name
    const emailUsed = emailThatComeFromCli ?? user.email

    system.exec(`git config user.name ${nameUsed}`)
    system.exec(`git config user.email ${emailUsed}`)

    const namePrint = print.colors.cyan(nameUsed)
    const emailPrint = print.colors.cyan(emailUsed)

    print.success(`Git configs changed!`)
    print.info(`User name: ${namePrint}`)
    print.info(`User email: ${emailPrint}`)
    print.newline()
    print.info(
      `Done in ${print.colors.cyan(
        String((timeElapsedInMs() / 1000).toFixed(2))
      )} seconds.`
    )
  },
}
