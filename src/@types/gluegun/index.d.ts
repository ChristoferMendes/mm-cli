import { GluegunToolbox } from 'gluegun'
import { IcreateHelp } from '../../extensions/create-help'

export type Toolbox = GluegunToolbox & {
  createFile: (
    folder: `src/${string}`,
    name: string | undefined
  ) => Promise<void>
  createHelp: ({
    options,
    commandName,
    description,
    example,
    alias,
  }: IcreateHelp) => void
}
