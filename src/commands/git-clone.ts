import { Command } from 'gluegun/build/types/domain/command'
import { GluegunError } from 'gluegun/build/types/toolbox/system-types'
import { Toolbox } from '../@types/gluegun'
import { hasHelpOtion } from '../shared/isHelpOption'
import { timer } from '../shared/classes/Timer'
import { userConfig } from '../shared/classes/UserConfig'

module.exports = {
  name: 'git-clone',
  alias: 'clone',
  description:
    'Clone a repository from your git (Using your credentials stored or your local git configurations)',
  run: async (toolbox: Toolbox) => {
    const { system, parameters, print, createHelp } = toolbox
    timer.start()

    const haveHelp = hasHelpOtion(parameters.options)
    const repository = parameters.first
    const { name } = parameters.options

    if (haveHelp || !repository) {
      return createHelp({
        commandName: 'git-clone',
        description: 'Pass the repository name you want to clone',
        example: '$ mm git-clone my-awesome-repo',
        options: [
          {
            flag: '--name',
            description:
              'Optionally, you can pass the name of the repository owner with it ($ mm clone react --name Facebook)',
          },
        ],
      })
    }

    const { user } = userConfig.read()

    const gitUserConfigured = await system.run('git config user.name')
    const userNameUsed = name ?? user?.name ?? gitUserConfigured

    const nameAndRepo = `${userNameUsed.trim()}/${repository.trim()}`

    const gitCloneCommand = `git clone git@github.com:${nameAndRepo}.git`

    try {
      await system.exec(gitCloneCommand)
      print.success('Cloned your repository with success!')
      print.info(`Repository name: ${print.colors.cyan(repository)}.`)

      userConfig.store({ git: { lastRepoCloned: repository } })
      return timer.printDuration()
    } catch (error) {
      const glueGunError = error as GluegunError
      print.info(glueGunError.message)
      return timer.printDuration()
    }
  },
} as Command
