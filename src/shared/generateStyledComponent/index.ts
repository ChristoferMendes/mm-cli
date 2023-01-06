import { IGenerateStyledComponent } from './IGenerateStyledComponent'

export async function generateStyledComponent({
  folderBasedOnIndexOption,
  styledTemplateFiles,
  props,
  template,
  targetFolder,
}: IGenerateStyledComponent): Promise<void> {
  const { name, styledComponentExtension } = props
  const [reactFile, styledFile] = styledTemplateFiles

  await template.generate({
    template: reactFile,
    target: folderBasedOnIndexOption,
    props: { name, extension: styledComponentExtension },
  })

  await template.generate({
    template: styledFile,
    target: `${targetFolder}/${name}/styles.${styledComponentExtension}`,
  })
}
