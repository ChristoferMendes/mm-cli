import { build, GluegunToolbox } from 'gluegun'
import * as figlet from 'figlet'

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
    .defaultCommand((toolbox: GluegunToolbox) => {
      const { print } = toolbox
      const onError = (err: Error, data: string) => {
        if (err) {
          console.log('Something went wrong...')
          console.dir(err)
          return
        }
        console.log(data)
      }

      print.success(
        `Please, type ${print.colors.cyan(
          'mm -h'
        )} to see the commands available!`
      )
      figlet.text(
        'MM CLI!',
        {
          font: '3D-ASCII',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 200,
          whitespaceBreak: true,
        },
        onError
      )
    })
    .exclude(['http', 'patching', 'package-manager', 'semver'])
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
