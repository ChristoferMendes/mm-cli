import { hasDependency } from '../../../shared/hasPackage'
import { ITreatTarget } from './ITreatTarget'

export async function treatTarget({
  folder,
  name,
  notIndexIsPresent,
  extension,
}: ITreatTarget): Promise<(string | undefined)[]> {
  const reactExtension = `${extension}x`
  const defaultPath = `${folder}/${name}`

  const defaultTargetFolder = `${defaultPath}/index.${reactExtension}`
  const notIndexTargetFolder = `${defaultPath}/${name}.${reactExtension}`
  const notIndexExporterTargetFolder = defaultTargetFolder

  const styledComponentIsPresent = await hasDependency('styled-components')
  const styledTargetFolder = styledComponentIsPresent
    ? `${defaultPath}/styles.${extension}`
    : undefined

  const notIndexDefault = ''

  const TARGET = {
    default: [defaultTargetFolder, notIndexDefault, styledTargetFolder],
    notIndex: [
      notIndexTargetFolder,
      notIndexExporterTargetFolder,
      styledTargetFolder,
    ],
  }

  if (notIndexIsPresent) return TARGET.notIndex

  return TARGET.default
}
