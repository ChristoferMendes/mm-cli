import { GluegunToolbox } from 'gluegun'
import { Command } from 'gluegun/build/types/domain/command'
import { isHelpOption } from '../utils/isHelpOption'

module.exports = {
  name: 'generate-component',
  description: 'Create a new file in src/components',
  alias: 'gen-comp',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, createComponent, createHelp, system, print } = toolbox
    const timeElapsedInMs = system.startTimer()

    const haveHelp = isHelpOption(parameters.options)

    if (haveHelp) {
      createHelp({
        options: [
          {
            flag: '--not-index',
            alias: '--not-i',
            description: 'Generate a file without a index as a main',
          },
          {
            flag: '--js',
            alias: null,
            description: 'Creates a jsx file (default is a tsx file)',
          },
        ],
        commandName: 'generate:page',
      })
      return
    }

    if (!parameters.first) {
      print.error('Name must be specified')
      print.info(`Done in ${timeElapsedInMs() / 1000} seconds.`)
      return
    }

    const name = parameters.first
    const nameToUpperCase = name[0].toUpperCase() + name.slice(1)

    await createComponent('src/components', nameToUpperCase)
    print.info(`Done in ${timeElapsedInMs() / 1000} seconds.`)
  },
} as Command
