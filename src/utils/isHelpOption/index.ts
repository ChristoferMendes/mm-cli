import { Options } from 'gluegun/build/types/domain/options'

export function isHelpOption(options: Options): boolean {
  const { help, h } = options

  const isHelp = help || h

  return isHelp
}
