import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { isHelpOption } from '../shared/isHelpOption'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'generate-screen',
  description: 'Create a new file in src/screens',
  alias: 'gen-screen',
  run: async (toolbox: Toolbox) => {
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
        ],
        commandName: 'generate:screen',
      })
      return print.info('Done in ' + timerString(timeElapsedInMs))
    }

    if (!parameters.first) {
      print.error('Name must be specified.')
      print.newline()
      print.info('Done in ' + timerString(timeElapsedInMs))
      return
    }

    const files = parameters.array
    for (const file of files) {
      const nameToUpperCase = toolbox.strings.upperFirst(file)
      await createFile('src/screens', nameToUpperCase)
    }
    print.newline()
    print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
