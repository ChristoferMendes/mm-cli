import { GluegunToolbox } from 'gluegun'
import { IcreateHelp } from '../../extensions/create-help'
import { IcreateHelpLegacy } from '../../extensions/create-help-legacy'

export type Toolbox = GluegunToolbox & {
  createFile: (
    folder: `src/${string}`,
    name: string | undefined
  ) => Promise<void>
  createFileLegacy(folder: string, name: string | undefined): Promise<void>
  createHelp: ({
    options,
    commandName,
    description,
    example,
    alias,
  }: IcreateHelp) => void
  createHelpLegacy: ({
    flags,
    aliases,
    descriptions,
    commandName,
  }: IcreateHelpLegacy) => void
}
