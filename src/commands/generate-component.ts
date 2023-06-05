import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { hasHelpOtion } from '../shared/isHelpOption'
import { timer } from '../shared/classes/Timer'

module.exports = {
  name: 'generate-component',
  description: 'Create a new file in src/components',
  alias: 'gen-comp',
  run: async (toolbox: Toolbox) => {
    const { parameters, createFile, createHelp, print } = toolbox
    timer.start()

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
      return timer.printDuration()
    }

    if (!parameters.first) {
      print.error('Name must be specified.')
      return timer.printDuration()
    }

    const files = parameters.array

    if (!files) {
      print.error('You must specify a file')
      print.newline()
      return timer.printDuration()
    }

    for (const file of files) {
      const nameToUpperCase = toolbox.strings.upperFirst(file)
      await createFile('src/components', nameToUpperCase)
    }

    return timer.printDuration()
  },
} as Command
