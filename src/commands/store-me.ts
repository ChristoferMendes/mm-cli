import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { hasHelpOtion } from '../shared/isHelpOption'
import { timer } from '../shared/classes/Timer'
import { userConfig } from '../shared/classes/UserConfig'
import { ParametersUserCredentialsFilter } from '../shared/classes/ParametersUserCredentialsFilter'

module.exports = {
  name: 'store-me',
  description:
    'Store your git credentials (default is your local git credentials)',
  run: async (toolbox: Toolbox) => {
    const { parameters, print, createHelp } = toolbox
    timer.start()

    const haveHelp = hasHelpOtion(parameters.options)

    if (haveHelp) {
      createHelp({
        commandName: 'store-me',
        description: 'store your credentials to be used in many other commands',
        example: '$ mm store-me john johndoe@gmail.com',
      })
      return timer.printDuration()
    }

    const userCredentials = new ParametersUserCredentialsFilter(parameters)

    const { name, email } = userCredentials

    if (!name || !email) {
      print.error('Name and email must be specified to create')
      return timer.printDuration()
    }

    userConfig.store({ user: { email, name } })

    print.success('Your credentials were stored')
    return timer.printDuration()
  },
} as Command
