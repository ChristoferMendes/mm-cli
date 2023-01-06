import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { prisma } from '../prisma'
import { isHelpOption } from '../shared/isHelpOption'

module.exports = {
  name: 'git-rm-repo',
  alias: 'rm-repo',
  description: 'Delete the last repository cloned',
  run: async (toolbox: Toolbox) => {
    const { print, system, parameters, createHelp } = toolbox

    const haveHelp = isHelpOption(parameters.options)

    if (haveHelp) {
      return createHelp({
        commandName: 'git-rm-repo',
        alias: 'rm-repo',
        description: 'Delete the last repository cloned',
      })
    }

    const lastRepo = await prisma.lastRepoCloned.findFirst()

    if (!lastRepo) return print.error('You do not cloned any repository')

    await system.run(`rm -rf ${lastRepo.name}`)
    return print.success(`Repository ${lastRepo.name} deleted!`)
  },
} as Command
