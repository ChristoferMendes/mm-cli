import { PrismaClient } from '@prisma/client'
import { GluegunToolbox } from 'gluegun'
import { generateStyledComponent } from '../utils/generateStyledComponent'
import { haveStyledComponent } from '../utils/haveStyledComponent'
import isReactNative from '../utils/isReactNative'
import { IGenerateFileOptions } from '../utils/Options'

const prisma = new PrismaClient()

module.exports = (toolbox: GluegunToolbox) => {
  const {
    filesystem,
    print: { success, error },
    template,
    parameters,
  } = toolbox

  async function createFile(folder: string, name: string | undefined) {
    if (!name) {
      error('Name must be specified')
      return
    }
    const { js, notIndex, notI, index } =
      parameters.options as IGenerateFileOptions
    const fileExtension = js ? 'jsx' : 'tsx'

    const templateFile = (await isReactNative({ filesystem }))
      ? 'component-rn.tsx.ejs'
      : 'component.tsx.ejs'

    const isStyledComponent = await haveStyledComponent({ filesystem })

    const defaultUserConfigs = await prisma.defaultConfig.findFirst()
    const haveNotIndexOption = notIndex || notI || defaultUserConfigs.index

    const folderBasedOnIndexOption =
      haveNotIndexOption && !index
        ? `${folder}/${name}/${name}.${fileExtension}`
        : `${folder}/${name}/index.${fileExtension}`

    if (isStyledComponent) {
      const styledTemplateFiles = (await isReactNative({ filesystem }))
        ? ['react-rn-styled.tsx.ejs', 'styled-rn.tsx.ejs']
        : ['react-styled.tsx.ejs', 'styled.tsx.ejs']

      await generateStyledComponent({
        folderBasedOnIndexOption,
        styledTemplateFiles,
        props: { name, extension: fileExtension },
        targetFolder: folder,
        template,
      })

      success(
        `Generated ${parameters.first} file at ${folderBasedOnIndexOption}!`
      )
      return
    }

    if (haveNotIndexOption) {
      await template.generate({
        template: `index-template.tsx.ejs`,
        target: `${folder}/${name}/index.${fileExtension}`,
        props: { name },
      })
    }

    await template.generate({
      template: templateFile,
      target: folderBasedOnIndexOption,
      props: { name },
    })

    success(
      `Generated ${parameters.first} file at ${folderBasedOnIndexOption}!`
    )
  }

  toolbox.createFile = createFile
}
