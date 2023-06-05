import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { prisma } from '../prisma'
import { hasHelpOtion } from '../shared/isHelpOption'
import { timer } from '../shared/classes/Timer'

module.exports = {
  name: 'git-rm-repo',
  alias: 'rm-repo',
  description: 'Delete the last repository cloned',
  run: async (toolbox: Toolbox) => {
    const { print, system, parameters, createHelp } = toolbox
    timer.start()

    const haveHelp = hasHelpOtion(parameters.options)

    if (haveHelp) {
      return createHelp({
        commandName: 'git-rm-repo',
        alias: 'rm-repo',
        description: 'Delete the last repository cloned',
      })
    }

    const lastRepo = await prisma.lastRepoCloned.findFirst()

    if (!lastRepo) {
      print.error('You do not cloned any repository')
      return timer.printDuration()
    }

    if (!lastRepo.name) {
      print.error('Your last repository cloned was already deleted')
      return timer.printDuration()
    }

    await system.run(`rm -rf ${lastRepo.name}`)

    await prisma.lastRepoCloned.update({
      where: { id: lastRepo.id },
      data: {
        name: '',
      },
    })
    print.success(`Repository ${lastRepo.name} deleted!`)
    return timer.printDuration()
  },
} as Command
