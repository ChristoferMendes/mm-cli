import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import { userConfig } from '../../../shared/classes/UserConfig'

export async function treatNotIndexOption({
  toolbox,
}: {
  toolbox: Toolbox
}): Promise<boolean> {
  const {
    parameters: { options },
  } = toolbox

  const { notI, notIndex, index: indexFlag } = options

  const { defaultConfigs } = userConfig.read()

  const notIndexIsPresent = notI || notIndex || defaultConfigs?.notIndex

  return notIndexIsPresent && !indexFlag
}
