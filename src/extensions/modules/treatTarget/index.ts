import { hasStyledComponents } from '../../../shared/hasStyledComponents'
import { ITreatTarget } from './ITreatTarget'

export async function treatTarget({
  toolbox,
  folder,
  name,
  notIndexIsPresent,
}: ITreatTarget): Promise<string[]> {
  const { filesystem } = toolbox

  const defaultTargetsKey = 'default'
  const notIndexTargetsKey = 'notIndex'

  const defaultTargetFolder = `${folder}/${name}/index.tsx`
  const notIndexTargetFolder = `${folder}/${name}/${name}.tsx`
  const notIndexExporterTargetFolder = `${folder}/${name}/index.tsx`

  const styledComponentIsPresent = await hasStyledComponents({ filesystem })
  const styledTargetFolder =
    styledComponentIsPresent && `${folder}/${name}/styles.ts`

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
