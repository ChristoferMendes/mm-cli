import { GluegunToolbox } from 'gluegun'
import { prisma } from '../prisma'
import { generateStyledComponent } from '../shared/generateStyledComponent'
import { haveNativeBase } from '../shared/haveNativeBase'
import { haveStyledComponent } from '../shared/haveStyledComponent'
import isReactNative from '../shared/isReactNative'
import { IGenerateFileOptions } from '../shared/Options'

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

    const isNativeBase = await haveNativeBase({ filesystem })
    const nativeImport = isNativeBase ? 'native-base' : 'react-native'

    const defaultUserConfigs = await prisma.defaultConfig.findFirst()
    const haveNotIndexOption = notIndex || notI || defaultUserConfigs?.index

    const folderBasedOnIndexOption =
      haveNotIndexOption && !index
        ? `${folder}/${name}/${name}.${fileExtension}`
        : `${folder}/${name}/index.${fileExtension}`

    const isStyledComponent = await haveStyledComponent({ filesystem })

    if (isStyledComponent) {
      const reactNativeStyledComponentsTemplates = [
        'react-rn-styled.tsx.ejs',
        'styled-rn.tsx.ejs',
      ]

      const reactStyledComponentsTemplates = [
        'react-styled.tsx.ejs',
        'styled.tsx.ejs',
      ]

      const styledTemplateFiles = (await isReactNative({ filesystem }))
        ? reactNativeStyledComponentsTemplates
        : reactStyledComponentsTemplates

      const extensionWithoutX = fileExtension.replace('x', '')

      if (haveNotIndexOption) {
        await template.generate({
          template: `index-template.tsx.ejs`,
          target: `${folder}/${name}/index.${fileExtension}`,
          props: { name },
        })
      }

      await generateStyledComponent({
        folderBasedOnIndexOption,
        styledTemplateFiles,
        props: { name, styledComponentExtension: extensionWithoutX },
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
      props: { name, native: nativeImport },
    })

    success(
      `Generated ${parameters.first} file at ${folderBasedOnIndexOption}!`
    )
  }

  toolbox.createFile = createFile
}
