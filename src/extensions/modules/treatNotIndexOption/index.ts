import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { prisma } from '../../../prisma'

export async function treatNotIndexOption({
  toolbox,
}: {
  toolbox: Toolbox
}): Promise<boolean> {
  const {
    parameters: { options },
  } = toolbox

  const { notI, notIndex, index: indexFlag } = options

  const defaultConfigStored = await prisma.defaultConfig.findFirst()

  const { notIndex: notIndexConfig = false } = defaultConfigStored ?? {}

  const notIndexIsPresent = notI || notIndex || notIndexConfig

  return notIndexIsPresent && !indexFlag
}
