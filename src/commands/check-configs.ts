import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from '../@types/gluegun'
import { userConfig } from '../shared/classes/UserConfig'
import { timer } from '../shared/classes/Timer'

module.exports = {
  name: 'check-configs',
  description: 'Check the current status of all your configs saved',
  run: async (toolbox: Toolbox) => {
    const { print } = toolbox
    timer.start()
    const configs = userConfig.readStringfy()

    print.success(configs)

    timer.printDuration()
  },
} as Command
