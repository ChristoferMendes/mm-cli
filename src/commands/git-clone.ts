import { GluegunToolbox } from 'gluegun'
import { Command } from 'gluegun/build/types/domain/command'
import { GluegunError } from 'gluegun/build/types/toolbox/system-types'
import { prisma } from '../prisma'
import { isHelpOption } from '../shared/isHelpOption'
import { timerString } from '../shared/timerString'

module.exports = {
  name: 'git-clone',
  alias: 'clone',
  description: 'Clone a repository from your git',
  run: async (toolbox: GluegunToolbox) => {
    const { system, parameters, print, createHelp } = toolbox
    const timeElapsedInMs = system.startTimer()

    const haveHelp = isHelpOption(parameters.options)
    const repository = parameters.first
    const { name } = parameters.options

    if (haveHelp || !repository) {
      return createHelp({
        commandName: 'git-clone',
        description: 'Pass the repository name you want to clone',
        example: '$ mm git-clone my-awesome-repo',
      })
    }

    const user = await prisma.user.findFirst()

    const gitUserConfigured = await system.run('git config user.name')
    const userNameUsed = name ?? user?.name ?? gitUserConfigured

    const nameAndRepo = `${userNameUsed.trim()}/${repository.trim()}`

    const gitCloneCommand = `git clone git@github.com:${nameAndRepo}.git`

    try {
      await system.exec(gitCloneCommand)
      print.success('Cloned your repository with success!')
      print.info(`Repository name: ${print.colors.cyan(repository)}.`)
      const lastRepo = await prisma.lastRepoCloned.findFirst()

      if (!lastRepo) {
        return await prisma.lastRepoCloned.create({
          data: {
            name: repository,
          },
        })
      }

      await prisma.lastRepoCloned.update({
        where: { id: lastRepo.id },
        data: {
          name: repository,
        },
      })
      print.newline()
      print.info('Done in ' + timerString(timeElapsedInMs))
    } catch (error) {
      const glueGunError = error as GluegunError
      print.info(glueGunError.message)
      print.newline()
      print.info('Done in ' + timerString(timeElapsedInMs))
    }
  },
} as Command
