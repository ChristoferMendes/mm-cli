import { GluegunToolbox } from 'gluegun'
import { treatNotIndexOption } from './modules/treatNotIndexOption'
import { treatProps } from './modules/treatProps'
import { treatTarget } from './modules/treatTarget'
import { treatTemplateFile } from './modules/treatTemplateFile'

module.exports = (toolbox: GluegunToolbox) => {
  const {
    template,
    print: { success },
  } = toolbox

  async function createFile(folder: `src/${string}`, name: string | undefined) {
    const notIndexIsPresent = await treatNotIndexOption({ toolbox })

    const targets = await treatTarget({
      toolbox,
      folder,
      name,
      notIndexIsPresent,
    })

    const templateFile = await treatTemplateFile({ toolbox, targets })
    const props = await treatProps({ name, toolbox })

    targets.filter(Boolean).forEach((target, index) => {
      template.generate({
        target,
        template: templateFile.filter(Boolean)[index],
        props,
      })
    })

    if (notIndexIsPresent) {
      return success(`Generated file at ${folder}/${name}/${name}.tsx`)
    }

    return success(`Generated file at ${folder}/${name}/index.tsx`)
  }

  toolbox.createFile = createFile
}
