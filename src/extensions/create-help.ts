import { GluegunToolbox } from 'gluegun'

interface IcreateHelp {
  options?: [
    {
      flag: string
      alias: string | null
      description: string
    }
  ]

  commandName: string
  description?: string
  example?: string
  alias?: string
}

module.exports = (toolbox: GluegunToolbox) => {
  const { print } = toolbox

  const createHelp = ({
    options,
    commandName,
    description = '',
    example = '',
    alias = '',
  }: IcreateHelp) => {
    print.info(`Command: ${commandName}`)
    if (description) print.info(`Description: ${description}`)
    if (example) print.info(`Example: ${example}`)
    if (alias) print.info(`Alias: ${alias}`)

    if (options != undefined) {
      const optionsSerialized = options.map((item) => [
        item.flag,
        item.alias,
        item.description,
      ])

      print.table([['Flag', 'Alias', 'Descriptions'], ...optionsSerialized], {
        format: 'lean',
      })
    }
  }

  toolbox.createHelp = createHelp
}
