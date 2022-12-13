import { GluegunToolbox } from 'gluegun'
import { Command } from 'gluegun/build/types/domain/command'
import { isHelpOption } from '../utils/isHelpOption'

module.exports = {
  name: 'generate-screen',
  description: 'Create a new file in src/screens',
  alias: 'gen-screen',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, createFile, createHelp, system, print } = toolbox
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
            flag: '--index',
            alias: null,
            description: 'Generate a file with a index as a main (default)',
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
      print.newline()
      print.info(
        `Done in ${print.colors.cyan(
          String((timeElapsedInMs() / 1000).toFixed(2))
        )} seconds.`
      )
      return
    }

    const name = parameters.first
    const nameToUpperCase = name[0].toUpperCase() + name.slice(1)

    await createFile('src/screens', nameToUpperCase)
    print.newline()
    print.info(
      `Done in ${print.colors.cyan(
        String((timeElapsedInMs() / 1000).toFixed(2))
      )} seconds.`
    )
  },
} as Command
