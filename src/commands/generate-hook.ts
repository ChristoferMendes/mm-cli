import { GluegunParameters } from 'gluegun'
import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { hasTypescript } from '../shared/hasTypescript'
import { hasHelpOtion } from '../shared/isHelpOption'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'generate-hook',
  description: 'generate a react hook',
  alias: 'gen-hook',
  run: async (toolbox: Toolbox) => {
    const { parameters, template, system, print, createHelp } = toolbox

    const timeElapsedInMs = system.startTimer()

    const isHelpOption = hasHelpOtion(parameters.options)

    if (isHelpOption) {
      return createHelp({
        commandName: 'generate-hook',
        alias: 'gen-hook',
        options: [
          {
            flag: '--dir',
            description:
              'Tells wich directory the file will be created the directory (default is ./src/hooks)',
          },
        ],
      })
    }

    const typescriptIsPresent = await hasTypescript()
    const extension = typescriptIsPresent ? '.ts' : '.js'

    const treatName = (parameters: GluegunParameters) => {
      const name = parameters.first

      if (!name) return `useHook${extension}`

      return name + extension
    }

    const name = treatName(parameters)

    const treatTarget = (parameters: GluegunParameters) => {
      const { dir } = parameters.options as { dir: string }

      if (!dir) return 'src/hooks/'

      const dirEndsWithSlash = dir.endsWith('/')

      const dirWithSlash = dir + '/'

      return dirEndsWithSlash ? dir : dirWithSlash
    }

    const directory = treatTarget(parameters)

    const target = directory + name

    await template.generate({
      template: 'hook.ejs',
      target: target,
      props: {
        name: parameters.first,
      },
    })

    const GENERATED = print.colors.green('GENERATED')
    const targetString = print.colors.cyan(target)
    print.info(`${GENERATED} ${targetString}`)
    print.newline()
    print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
