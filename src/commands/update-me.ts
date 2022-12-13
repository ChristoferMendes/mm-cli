import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'

module.exports = {
  name: 'update-me',
  description: 'update your credentials',
  run: async (toolbox: Toolbox) => {
    const { system, parameters, print } = toolbox

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i

    const name = parameters.array.filter((item) => !item.match(emailRegex))[0]
    const email = parameters.array.filter((item) => item.match(emailRegex))[0]

    if (!name && !email) {
      return print.error('At least name or email must be specified')
    }

    const a = await system.run(`mm store-me ${name} ${email}`)
    print.info(a)
  },
} as Command
