import { GluegunToolbox } from 'gluegun'
import { treatProps } from './modules/treatProps'
import { treatTarget } from './modules/treatTarget'
import { treatTemplateFile } from './modules/treatTemplateFile'

module.exports = (toolbox: GluegunToolbox) => {
  const {
    template,
    print: { success },
  } = toolbox

  async function createFile(folder: `src/${string}`, name: string | undefined) {
    const targets = await treatTarget({ toolbox, folder, name })
    const templateFile = await treatTemplateFile(toolbox, targets)
    const props = await treatProps({ name, toolbox })

    targets.filter(Boolean).forEach(async (target, index) => {
      await template.generate({
        target,
        template: templateFile.filter(Boolean)[index],
        props,
      })
    })

    success(`Generated file at ${folder}/${name}`)
  }

  toolbox.createFile = createFile
}
