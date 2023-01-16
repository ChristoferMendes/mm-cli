import { GluegunToolbox } from 'gluegun'
import { Command } from 'gluegun/build/types/domain/command'
import { isHelpOption } from '../shared/isHelpOption'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'generate-component',
  description: 'Create a new file in src/components',
  alias: 'gen-comp',
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

    const name = parameters.first
    const nameToUpperCase = toolbox.strings.upperFirst(name)

    await createFile('src/components', nameToUpperCase)
    print.newline()
    print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
