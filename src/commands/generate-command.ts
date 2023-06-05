import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { timerString } from '../shared/classes/Timer'
import { verifyProjectName } from '../shared/verifyProjectName'

module.exports = {
  name: 'generate-command',
  description: 'generate a new command (dev-only)',
  alias: 'gen-comm',
  hidden: true,
  run: async (toolbox: Toolbox) => {
    const { parameters, template, print, system } = toolbox
    const timeElapsedInMs = system.startTimer()
    const projectNameIsMMTECCLI = await verifyProjectName()

    if (!projectNameIsMMTECCLI) return print.error('PROJECT INVALID')

    const { name, desc, alias } = parameters.options
    const target = `src/commands/${name}.ts`

    await template.generate({
      template: 'command.ejs',
      target,
      props: { name, desc, alias },
    })

    const pathLog = print.colors.cyan(target)

    print.success(`GENERATED ${pathLog}`)
    print.newline()
    print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
