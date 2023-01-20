import { hasStyledComponents } from '../../../shared/hasStyledComponents'
import { ITreatTarget } from './ITreatTarget'

export async function treatTarget({
  toolbox,
  folder,
  name,
  notIndexIsPresent,
  typescriptIsPresent,
}: ITreatTarget): Promise<string[]> {
  const { filesystem } = toolbox

  const defaultTargetsKey = 'default'
  const notIndexTargetsKey = 'notIndex'

  const extension = typescriptIsPresent ? 'ts' : 'js'
  const reactExtension = `${extension}x`
  const defaultPath = `${folder}/${name}`

  const defaultTargetFolder = `${defaultPath}/index.${reactExtension}`
  const notIndexTargetFolder = `${defaultPath}/${name}.${reactExtension}`
  const notIndexExporterTargetFolder = defaultTargetFolder

  const styledComponentIsPresent = await hasStyledComponents({ filesystem })
  const styledTargetFolder =
    styledComponentIsPresent && `${defaultPath}/styles.${extension}`

  const target = {
    [defaultTargetsKey]: [defaultTargetFolder, styledTargetFolder],
    [notIndexTargetsKey]: [
      notIndexTargetFolder,
      notIndexExporterTargetFolder,
      styledTargetFolder,
    ],
  }

  if (notIndexIsPresent) return target[notIndexTargetsKey]

  return target[defaultTargetsKey]
}
