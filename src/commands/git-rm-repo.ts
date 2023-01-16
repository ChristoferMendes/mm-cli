import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { prisma } from '../prisma'
import { isHelpOption } from '../shared/isHelpOption'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'git-rm-repo',
  alias: 'rm-repo',
  description: 'Delete the last repository cloned',
  run: async (toolbox: Toolbox) => {
    const { print, system, parameters, createHelp } = toolbox
    const timeElapsedInMs = system.startTimer()

    const haveHelp = isHelpOption(parameters.options)

    if (haveHelp) {
      return createHelp({
        commandName: 'git-rm-repo',
        alias: 'rm-repo',
        description: 'Delete the last repository cloned',
      })
    }

    const lastRepo = await prisma.lastRepoCloned.findFirst()

    if (!lastRepo) {
      return print.error('You do not cloned any repository')
    }

    if (!lastRepo.name) {
      return print.error('Your last repository was already deleted')
    }

    await system.run(`rm -rf ${lastRepo.name}`)

    await prisma.lastRepoCloned.update({
      where: { id: lastRepo.id },
      data: {
        name: '',
      },
    })
    print.success(`Repository ${lastRepo.name} deleted!`)
    print.newline()
    print.info('Done in ' + timerString(timeElapsedInMs))
  },
} as Command
