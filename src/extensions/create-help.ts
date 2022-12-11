import { GluegunToolbox } from 'gluegun'

interface IcreateHelp {
  options: [
    {
      flag: string
      alias: string | null
      description: string
    }
  ]
  commandName: string
}

module.exports = (toolbox: GluegunToolbox) => {
  const { print } = toolbox

  const createHelp = ({ options, commandName }: IcreateHelp) => {
    print.info(`Flags for ${commandName}`)
    const optionsSerialized = options.map((item) => [
      item.flag,
      item.alias,
      item.description,
    ])
    print.table([['Flag', 'Alias', 'Descriptions'], ...optionsSerialized], {
      format: 'lean',
    })
  }

  toolbox.createHelp = createHelp
}
