import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { hasHelpOtion } from '../shared/isHelpOption'
import { timer } from '../shared/classes/Timer'
import { userConfig } from '../shared/classes/UserConfig'

module.exports = {
  name: 'git-rm-repo',
  alias: 'rm-repo',
  description: 'Delete the last repository cloned',
  run: async (toolbox: Toolbox) => {
    const { parameters, createHelp, print, system } = toolbox
    timer.start()

    const haveHelp = hasHelpOtion(parameters.options)

    if (haveHelp) {
      return createHelp({
        commandName: 'git-rm-repo',
        alias: 'rm-repo',
        description: 'Delete the last repository cloned',
      })
    }

    const { git } = userConfig.read()

    if (!git?.lastRepoCloned) {
      print.error(
        'Either your last repository cloned was already deleted or you never cloned any repository'
      )
      return timer.printDuration()
    }

    const { lastRepoCloned } = git

    await system.run(`rm -rf ${lastRepoCloned}`)

    print.success(`Repository ${lastRepoCloned} deleted!`)

    userConfig.store({ git: { lastRepoCloned: null } })
    return timer.printDuration()
  },
} as Command
