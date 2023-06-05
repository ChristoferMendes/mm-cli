import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { userConfig } from '../shared/classes/UserConfig'
import { hasHelpOtion } from '../shared/isHelpOption'

module.exports = {
  name: 'default-configs',
  description:
    'Store default configs. Currently just the notIndex option when creating a file',
  run: async (toolbox: Toolbox) => {
    const { parameters, print, createHelp, prompt } = toolbox

    const userRequestedHelp = hasHelpOtion(parameters.options)

    if (userRequestedHelp) {
      return createHelp({
        options: [
          {
            flag: '--not-index=true',
            alias: '--not-i=true',
            description:
              'Pass this flag if you want it to be your default when creating a file. It can be --not-index=false or --not-index=true',
          },
        ],
        commandName: 'default-configs',
      })
    }

    const flagWithColor = print.colors.cyan('--notIndex')

    const initialOption = true
    const notIndex = await prompt.confirm(
      `Do you want ${flagWithColor} flag to be you default when creating a file?`,
      initialOption
    )

    userConfig.store({ defaultConfigs: { notIndex } })

    print.info('Default configs stored!')
    print.info('You can change them later by running `default-configs` command')
  },
} as Command
