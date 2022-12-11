import { GluegunTemplate } from 'gluegun'

export interface IGenerateStyledComponent {
  styledTemplateFiles: string[]
  folderBasedOnIndexOption: string
  props: {
    name: string
    extension: string
  }
  template: GluegunTemplate
  targetFolder: string
}
