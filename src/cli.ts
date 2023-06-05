import { build, GluegunToolbox } from 'gluegun'
import * as figlet from 'figlet'
import { userConfig } from './shared/classes/UserConfig'

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
      const { print, prompt, system } = toolbox
      const onError = (err: Error | null, data: string | undefined) => {
        if (err) {
          print.error('Something went wrong...')
          console.dir(err)
          return
        }
        print.info(data)
      }

      const configExists = userConfig.configExists()

      if (configExists) {
        print.success(
          `Please, type ${print.colors.cyan(
            'mm -h'
          )} to see the commands available!`
        )
        return figlet.text(
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
      }

      const usernameOnMachine = await system.exec('whoami')
      const userConfirmed = await prompt.confirm(
        `Hello ${usernameOnMachine}! It seems that it's your first time using this CLI. So, do you want to setup some default configurations?`,
        true
      )

      if (!userConfirmed) {
        print.info(
          "That's okay! Please, type 'mm -h' to see the commands available!"
        )
      }

      const result = await prompt.ask({
        message:
          'What type of structure do you want your files to be generated (we will use the components folder as examples)',
        choices: [
          {
            message:
              'src/components/Navbar/Navbar.tsx && src/components/Navbar/index.tsx',
            name: 'Not Index Option',
          },
          {
            message: 'src/components/Navbar/index.tsx',
            name: 'Index Option',
          },
        ],
        type: 'select',
        name: 'select',
      })

      userConfig.store({
        defaultConfigs: { notIndex: result.select === 'Not Index Option' },
      })

      const emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i
      const { name, email } = await prompt.ask([
        {
          message: 'Username used on git',
          type: 'input',
          name: 'name',
          validate(value) {
            return !emailRegex.test(value)
          },
        },
        {
          message: 'Email used on git',
          type: 'input',
          name: 'email',
          validate(value) {
            return emailRegex.test(value)
          },
        },
      ])

      userConfig.store({ user: { email, name } })
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
