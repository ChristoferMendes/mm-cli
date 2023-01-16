import { prisma } from '../../../prisma'
import { hasStyledComponents } from '../../../shared/hasStyledComponents'
import { ITreatTarget } from './ITreatTarget'

export async function treatTarget({
  toolbox,
  folder,
  name,
}: ITreatTarget): Promise<string[]> {
  const {
    parameters: { options },
    filesystem,
  } = toolbox

  const { notI, notIndex } = options
  const { index: notIndexConfig } =
    (await prisma.defaultConfig.findFirst()) ?? { index: false }

  const defaultTarget = 'default'
  const notIndexTargets = 'notIndex'

  const styledComponentIsPresent = await hasStyledComponents({ filesystem })
  const styledTargetFolder =
    styledComponentIsPresent && `${folder}/${name}/styles.ts`

  const defaultTargetFolder = `${folder}/${name}/index.tsx`
  const notIndexTargetFolder = `${folder}/${name}/${name}.tsx`
  const notIndexExporterTargetFolder = `${folder}/${name}/index.tsx`

  const target = {
    [defaultTarget]: [defaultTargetFolder, styledTargetFolder],
    [notIndexTargets]: [
      notIndexTargetFolder,
      styledTargetFolder,
      notIndexExporterTargetFolder,
    ],
  }

  if (notI || notIndex || notIndexConfig) return target[notIndexTargets]

  return target[defaultTarget]
}
