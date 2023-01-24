import { Toolbox } from '../@types/gluegun'

export interface IcreateHelp {
  options?: Array<{
    flag: string
    alias?: string
    description: string
  }>

  commandName: string
  description?: string
  example?: string
  alias?: string
}

module.exports = (toolbox: Toolbox) => {
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
      print.newline()
      print.info('Flags')
      const optionsSerialized = options.map((item) => [
        item.flag,
        item.alias,
        item.description,
      ])

      print.table([['Flag', 'Alias', 'Description'], ...optionsSerialized], {
        format: 'lean',
      })
    }
  }

  toolbox.createHelp = createHelp
}
