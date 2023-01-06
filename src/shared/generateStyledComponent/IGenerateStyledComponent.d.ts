import { GluegunTemplate } from 'gluegun'

export interface IGenerateStyledComponent {
  styledTemplateFiles: string[]
  folderBasedOnIndexOption: string
  props: {
    name: string
    styledComponentExtension: string
  }
  template: GluegunTemplate
  targetFolder: string
}
