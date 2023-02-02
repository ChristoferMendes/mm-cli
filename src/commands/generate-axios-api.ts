import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { handleGeneratedFileOutput } from '../extensions/modules/handleGeneratedFileOutput'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'generate-axios-api',
  alias: 'gen-axios-api',
  description: 'generate a base service to use axios',
  run: async (toolbox: Toolbox) => {
    const { template, parameters, print, system } = toolbox
    const timeElapsedInMs = system.startTimer()

    const port = parameters.first

    if (typeof port != 'number') {
      return print.error('Please, type a number')
    }

    template.generate({
      template: 'axios-api.ejs',
      target: 'src/services/api.ts',
      props: { port },
    })

    const generatedString = print.colors.green('GENERATED')
    const path = print.colors.cyan('src/services/api.ts')

    print.info(`${generatedString} ${path}`)

    print.newline()
    print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
