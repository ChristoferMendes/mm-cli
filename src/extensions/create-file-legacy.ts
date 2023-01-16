import { GluegunToolbox } from 'gluegun'
import { prisma } from '../prisma'
import { generateStyledComponent } from '../shared/generateStyledComponent'
import { hasNativeBase } from '../shared/hasNativeBase'
import { hasStyledComponents } from '../shared/hasStyledComponents'
import hasReactNative from '../shared/hasReactNative'
import { IGenerateFileOptions } from '../shared/Options'

module.exports = (toolbox: GluegunToolbox) => {
  const {
    filesystem,
    print: { success, error },
    template,
    parameters,
  } = toolbox

  async function createFileLegacy(folder: string, name: string | undefined) {
    if (!name) {
      error('Name must be specified')
      return
    }
    const { js, notIndex, notI, index } =
      parameters.options as IGenerateFileOptions

    const defaultUserConfigs = await prisma.defaultConfig.findFirst()
    const haveNotIndexOption = notIndex || notI || defaultUserConfigs?.index

    const fileExtension = js ? 'jsx' : 'tsx'

    const notIndexOptionIsPresent = haveNotIndexOption && !index
    const notIndexFolder = `${folder}/${name}/${name}.${fileExtension}`
    const indexFolder = `${folder}/${name}/index.${fileExtension}`

    const folderBasedOnIndexOption = notIndexOptionIsPresent
      ? notIndexFolder
      : indexFolder

    const isStyledComponent = await hasStyledComponents({ filesystem })

    if (isStyledComponent) {
      const reactNativeStyledComponentsTemplates = [
        'react-rn-styled.tsx.ejs',
        'styled-rn.tsx.ejs',
      ]

      const reactStyledComponentsTemplates = [
        'react-styled.tsx.ejs',
        'styled.tsx.ejs',
      ]

      const styledTemplateFiles = (await hasReactNative({ filesystem }))
        ? reactNativeStyledComponentsTemplates
        : reactStyledComponentsTemplates

      const extensionWithoutX = fileExtension.replace('x', '')

      if (haveNotIndexOption) {
        await template.generate({
          template: `index-exporter-template.tsx.ejs`,
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
        template: `index-exporter-template.tsx.ejs`,
        target: `${folder}/${name}/index.${fileExtension}`,
        props: { name },
      })
    }

    const templateFile = (await hasReactNative({ filesystem }))
      ? 'component-rn.tsx.ejs'
      : 'component.tsx.ejs'

    const isNativeBase = await hasNativeBase({ filesystem })
    const nativeImport = isNativeBase ? 'native-base' : 'react-native'

    await template.generate({
      template: templateFile,
      target: folderBasedOnIndexOption,
      props: { name, native: nativeImport },
    })

    success(
      `Generated ${parameters.first} file at ${folderBasedOnIndexOption}!`
    )
  }

  toolbox.createFileLegacy = createFileLegacy
}
