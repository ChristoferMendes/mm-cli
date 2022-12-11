import { GluegunToolbox } from 'gluegun'

interface IcreateHelp {
  flags: string[]
  aliases: string[]
  descriptions: string[]
  commandName: string
}

module.exports = (toolbox: GluegunToolbox) => {
  const { print } = toolbox

  const createHelpLegacy = ({
    flags,
    aliases,
    descriptions,
    commandName,
  }: IcreateHelp) => {
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
