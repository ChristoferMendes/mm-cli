import { Command } from "gluegun/build/types/domain/command";
import { Toolbox } from "gluegun/build/types/domain/toolbox";
import { GluegunError } from "gluegun/build/types/toolbox/system-types";

module.exports = {
  name: 'git-clone',
  description: 'Clone a repository from your git',
  run: async (toolbox: Toolbox) => {
    const { system, parameters, print } = toolbox

    const userName = await system.run('git config user.name')
    const repository = parameters.first
    const stringWithoutBreakingSpaces = (string: string) => string.trim()
    
    const nameAndRepo = `${stringWithoutBreakingSpaces(userName)}/${stringWithoutBreakingSpaces(repository)}`

    const command = `git clone git@github.com:${nameAndRepo}.git`

    try {
      await system.exec(command)
      print.success('Cloned your repository with succes!')
      print.info(`Repository name: ${print.colors.cyan(repository)}.`)
    } catch (error) {
      const glueGunError = error as GluegunError
      print.info(glueGunError.message)
    }
  }
} as Command