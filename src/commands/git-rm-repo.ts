import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { prisma } from '../prisma'
import { hasHelpOtion } from '../shared/isHelpOption'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'git-rm-repo',
  alias: 'rm-repo',
  description: 'Delete the last repository cloned',
  run: async (toolbox: Toolbox) => {
    const { print, system, parameters, createHelp } = toolbox
    const timeElapsedInMs = system.startTimer()

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
      print.newline()
      return print.info('Done in ' + timerString(timeElapsedInMs))
    }

    if (!lastRepo.name) {
      print.error('Your last repository cloned was already deleted')
      print.newline()
      return print.info('Done in ' + timerString(timeElapsedInMs))
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
