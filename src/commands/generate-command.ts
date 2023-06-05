import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { verifyProjectName } from '../shared/verifyProjectName'
import { timer } from '../shared/classes/Timer'

module.exports = {
  name: 'generate-command',
  description: 'generate a new command (dev-only)',
  alias: 'gen-comm',
  hidden: true,
  run: async (toolbox: Toolbox) => {
    timer.start()

    const { parameters, template, print } = toolbox
    const projectNameIsMMTECCLI = await verifyProjectName()

    if (!projectNameIsMMTECCLI) {
      print.error('PROJECT INVALID')
      return timer.printDuration()
    }

    const { name, desc, alias } = parameters.options
    const target = `src/commands/${name}.ts`

    await template.generate({
      template: 'command.ejs',
      target,
      props: { name, desc, alias },
    })

    const pathLog = print.colors.cyan(target)

    print.success(`GENERATED ${pathLog}`)
    return timer.printDuration()
  },
} as Command
