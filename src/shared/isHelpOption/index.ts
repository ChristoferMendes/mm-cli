import { Options } from 'gluegun/build/types/domain/options'
import { HelpOptions } from './IIsHelpOption'

export function hasHelpOtion(options: Options): boolean {
  const { help, h } = options as HelpOptions

  const isHelp = help || h

  return isHelp
}
