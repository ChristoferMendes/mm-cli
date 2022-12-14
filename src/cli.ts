import { build, GluegunToolbox } from 'gluegun'

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  // create a CLI runtime
  const cli = build()
    .brand('mm')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'mm-*', hidden: true })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .defaultCommand(async (toolbox: GluegunToolbox) => {
      const { system, print } = toolbox
      const output = await system.run('mm -h')
      print.info(output)
    })
    .create()
  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])
  // and run it
  const toolbox = await cli.run(argv)

  // send it back (for testing, mostly)
  return toolbox
}

module.exports = { run }
