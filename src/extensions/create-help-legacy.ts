import { Toolbox } from '../@types/gluegun'

export interface IcreateHelpLegacy {
  flags: string[]
  aliases: string[]
  descriptions: string[]
  commandName: string
}

module.exports = (toolbox: Toolbox) => {
  const { print } = toolbox

  const createHelpLegacy = ({
    flags,
    aliases,
    descriptions,
    commandName,
  }: IcreateHelpLegacy) => {
    print.info(`Flags for ${commandName}`)
    const options = []
    for (let i = 0; i < flags.length; i++) {
      options[i] = [flags[i], aliases[i], descriptions[i]]
    }
    print.table([['Flag', 'Alias', 'Description'], ...options], {
      format: 'lean',
    })
  }

  toolbox.createHelpLegacy = createHelpLegacy
}
