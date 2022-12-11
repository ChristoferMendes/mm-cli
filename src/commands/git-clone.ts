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
    

    const command = `git clone git@github.com:${stringWithoutBreakingSpaces(userName)}/${stringWithoutBreakingSpaces(repository)}.git`

    try {

      const git = await system.exec(command)
      console.log(git)
    } catch (error) {
      const glueGunError = error as GluegunError
      print.info(glueGunError.message)
    }
  }
} as Command