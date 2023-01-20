import { Options } from 'gluegun/build/types/domain/options'
import { HelpOptions } from './IIsHelpOption'

export function isHelpOption(options: Options): boolean {
  const { help, h } = options as HelpOptions

  const isHelp = help || h

  return isHelp
}
