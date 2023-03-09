import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { hasHelpOtion } from '../shared/isHelpOption'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'generate-component',
  description: 'Create a new file in src/components',
  alias: 'gen-comp',
  run: async (toolbox: Toolbox) => {
    const { parameters, createFile, createHelp, system, print } = toolbox
    const timeElapsedInMs = system.startTimer()

    const haveHelp = hasHelpOtion(parameters.options)

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
            description: 'Generate a file with a index as a main (default)',
          },
        ],
        commandName: 'generate:page',
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

    if (!files) {
      print.error('You must specify a file')
      print.newline()
      return print.info('Done in ' + timerString(timeElapsedInMs))
    }

    for (const file of files) {
      const nameToUpperCase = toolbox.strings.upperFirst(file)
      await createFile('src/components', nameToUpperCase)
    }
    print.newline()
    print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
