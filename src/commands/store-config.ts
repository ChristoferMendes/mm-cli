import { Command } from 'gluegun/build/types/domain/command'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { prisma } from '../prisma'
import { isHelpOption } from '../shared/isHelpOption'
import { IGenerateFileOptions } from '../shared/Options'

module.exports = {
  name: 'store-configs',
  description:
    'Store default configs. Currently just the notIndex option when creating a file',
  run: async (toolbox: Toolbox) => {
    const { parameters, print, createHelp, prompt } = toolbox
    const helper = () => {
      return createHelp({
        options: [
          {
            flag: '--not-index=true',
            alias: '--not-i=true',
            description:
              'Pass this flag if you want it to be your default when creating a file. It can be --not-index=false or --not-index=true',
          },
        ],
        commandName: 'default-configs',
      })
    }

    const isOptionsEmpty = Object.keys(parameters.options).length === 0

    if (isOptionsEmpty) {
      const confirmation = await prompt.confirm(
        'Do you want --not-index to be your default when generating a file?'
      )

      const config = await prisma.defaultConfig.findFirst()

      if (config) {
        await prisma.defaultConfig.update({
          where: { id: config.id },
          data: {
            notIndex: confirmation,
          },
        })
        return print.success(
          `Default config updated! not-index config: ${confirmation}.`
        )
      }

      await prisma.defaultConfig.create({
        data: {
          notIndex: confirmation,
        },
      })

      return print.success(
        `Default config saved! not-index config: ${confirmation}.`
      )
    }

    const haveHelp = isHelpOption(parameters.options)

    if (haveHelp) {
      return helper()
    }

    const { notI, notIndex } = parameters.options as IGenerateFileOptions
    if (typeof notI === 'boolean' || typeof notIndex === 'boolean') {
      return print.error(
        'Please, type $ mm default-configs --not-index=<true or false>'
      )
    }

    const config = await prisma.defaultConfig.findFirst()

    if (config) {
      await prisma.defaultConfig.update({
        where: { id: config.id },
        data: {
          notIndex: JSON.parse(notI || notIndex),
        },
      })
      return print.success(
        `Default config updated! not-index config: ${notI ?? notIndex}.`
      )
    }

    await prisma.defaultConfig.create({
      data: {
        notIndex: JSON.parse(notI || notIndex),
      },
    })

    print.success(
      `Default config saved! not-index config: ${notI ?? notIndex}.`
    )
  },
} as Command
