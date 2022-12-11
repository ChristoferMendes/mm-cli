import { GluegunToolbox } from 'gluegun'
import { Command } from 'gluegun/build/types/domain/command'
import { isHelpOption } from '../utils/isHelpOption'

module.exports = {
  name: 'generate-page',
  description: 'Create a new file in src/pages',
  alias: 'gen-page',
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
            description:
              'Creates a javascript file (default is a Typescript file)',
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

    await createComponent('src/pages', nameToUpperCase)
    print.info(`Done in ${timeElapsedInMs() / 1000} seconds.`)
  },
} as Command
