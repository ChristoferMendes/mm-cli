import { GluegunToolbox } from 'gluegun'
import { Command } from 'gluegun/build/types/domain/command'
import { isHelpOption } from '../utils/isHelpOption'

module.exports = {
  name: 'generate-screen',
  description: 'Create a new file in src/screens',
  alias: 'gen-screen',
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
            description: 'Generate a file without a index as a main.',
          },
          {
            flag: '--js',
            alias: null,
            description:
              'Creates a javascript file (default is a Typescript file).',
          },
        ],
        commandName: 'generate:screen',
      })
      return
    }

    if (!parameters.first) {
      print.error('Name must be specified.')
      print.info(`Done in ${(timeElapsedInMs() / 1000).toFixed(2)} seconds.`)
      return
    }

    const name = parameters.first
    const nameToUpperCase = name[0].toUpperCase() + name.slice(1)

    await createComponent('src/screens', nameToUpperCase)
    print.info(`Done in ${(timeElapsedInMs() / 1000).toFixed(2)} seconds.`)
  },
} as Command
