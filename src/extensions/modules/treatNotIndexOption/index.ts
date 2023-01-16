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

  const { notI, notIndex } = options

  const defaultConfigStored = await prisma.defaultConfig.findFirst()

  const { index: notIndexConfig } = defaultConfigStored ?? { index: false }

  const notIndexIsPresent = notI || notIndex || notIndexConfig

  return notIndexIsPresent
}
