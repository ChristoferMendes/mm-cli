import { hasStyledComponents } from '../../../shared/hasStyledComponents'
import { ITreatTarget } from './ITreatTarget'

export async function treatTarget({
  folder,
  name,
  notIndexIsPresent,
  extension,
}: ITreatTarget): Promise<string[]> {
  const defaultTargetsKey = 'default'
  const notIndexTargetsKey = 'notIndex'

  const reactExtension = `${extension}x`
  const defaultPath = `${folder}/${name}`

  const defaultTargetFolder = `${defaultPath}/index.${reactExtension}`
  const notIndexTargetFolder = `${defaultPath}/${name}.${reactExtension}`
  const notIndexExporterTargetFolder = defaultTargetFolder

  const styledComponentIsPresent = await hasStyledComponents()
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
