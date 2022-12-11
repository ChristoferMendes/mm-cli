import { IGenerateStyledComponent } from './IGenerateStyledComponent'

export async function generateStyledComponent({
  folderBasedOnIndexOption,
  styledTemplateFiles,
  props,
  template,
  targetFolder,
}: IGenerateStyledComponent): Promise<void> {
  const { name, extension } = props

  await template.generate({
    template: styledTemplateFiles[0],
    target: folderBasedOnIndexOption,
    props: { name, extension },
  })

  await template.generate({
    template: styledTemplateFiles[1],
    target: `${targetFolder}/${name}/styles.${extension}`,
  })
}
