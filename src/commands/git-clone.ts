import { GluegunToolbox } from 'gluegun'
import { Command } from 'gluegun/build/types/domain/command'
import { GluegunError } from 'gluegun/build/types/toolbox/system-types'
import { PrismaClient } from '../prisma/generated/client'
import { isHelpOption } from '../utils/isHelpOption'

const prisma = new PrismaClient()

module.exports = {
  name: 'git-clone',
  alias: 'clone',
  description: 'Clone a repository from your git',
  run: async (toolbox: GluegunToolbox) => {
    const { system, parameters, print, createHelp } = toolbox
    const timeElapsedInMs = system.startTimer()

    const haveHelp = isHelpOption(parameters.options)
    const repository = parameters.first

    if (haveHelp || !repository) {
      createHelp({
        commandName: 'git-clone',
        description: 'Pass the repository name you want to clone',
        example: 'mm git-clone my-awesome-repo',
      })
      return
    }

    const user = await prisma.user.findFirst()

    const userName = user?.name ?? (await system.run('git config user.name'))

    const nameAndRepo = `${userName.trim()}/${repository.trim()}`

    const command = `git clone git@github.com:${nameAndRepo}.git`

    try {
      await system.exec(command)
      print.success('Cloned your repository with succes!')
      print.info(`Repository name: ${print.colors.cyan(repository)}.`)
      print.newline()
      print.info(
        `Done in ${print.colors.cyan(
          String((timeElapsedInMs() / 1000).toFixed(2))
        )} seconds.`
      )
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
    } catch (error) {
      const glueGunError = error as GluegunError
      print.info(glueGunError.message)
      print.newline()
      print.info(
        `Done in ${print.colors.cyan(
          String((timeElapsedInMs() / 1000).toFixed(2))
        )} seconds.`
      )
    }
  },
} as Command
