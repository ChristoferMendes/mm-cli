import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')

export const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'mm') + ` ${cmd}`)
