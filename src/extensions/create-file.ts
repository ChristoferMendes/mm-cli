import { Toolbox } from '../@types/gluegun'
import { hasTypescript } from '../shared/hasTypescript'
import { handleGeneratedFileOutput } from './modules/handleGeneratedFileOutput'
import { treatNotIndexOption } from './modules/treatNotIndexOption'
import { treatProps } from './modules/treatProps'
import { treatTarget } from './modules/treatTarget'
import { treatTemplateFile } from './modules/treatTemplateFile'

module.exports = (toolbox: Toolbox) => {
  const { template } = toolbox

  async function createFile(folder: `src/${string}`, name: string | undefined) {
    const notIndexIsPresent = await treatNotIndexOption({ toolbox })

    const typescriptIsPresent = await hasTypescript()
    const extension = typescriptIsPresent ? 'ts' : 'js'

    const targets = await treatTarget({
      folder,
      name,
      notIndexIsPresent,
      extension,
    })

    const templateFile = await treatTemplateFile({ targets })
    const props = await treatProps({ name, extension })

    targets.filter(Boolean).forEach((target, index) => {
      template.generate({
        target,
        template: templateFile.filter(Boolean)[index] as string,
        props,
      })
    })

    const outPutVariables = { folder, name, extension, notIndexIsPresent }

    return handleGeneratedFileOutput(outPutVariables)
  }

  toolbox.createFile = createFile
}
