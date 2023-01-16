import { Toolbox } from 'gluegun/build/types/domain/toolbox'
import hasReactNative from '../../../shared/hasReactNative'
import { hasStyledComponents } from '../../../shared/hasStyledComponents'

export async function treatTemplateFile(
  toolbox: Toolbox,
  targets: string[]
): Promise<string[]> {
  const { filesystem } = toolbox
  const reactKey = 'react'
  const reactNativeKey = 'reactNative'
  const reactWithSyledComponentsKey = 'reactWithStyled'
  const reactNativeWithStyledComponentsKey = 'reactNativeWithSyledComponentes'

  const [, , notIndexTarget] = targets

  const notIndexExporter = notIndexTarget && 'index-exporter.ejs'

  const templateFile = {
    [reactKey]: ['react.ejs', notIndexExporter],
    [reactNativeKey]: ['react-rn.ejs', notIndexExporter],
    [reactWithSyledComponentsKey]: [
      'react-styled.ejs',
      'styled.ejs',
      notIndexExporter,
    ],
    [reactNativeWithStyledComponentsKey]: [
      'react-rn-styled.ejs',
      'styled-rn.ejs',
      notIndexExporter,
    ],
  }

  const reactNativeIsPresent = await hasReactNative({ filesystem })
  const styledComponentIsPresent = await hasStyledComponents({ filesystem })

  if (reactNativeIsPresent && styledComponentIsPresent) {
    return templateFile[reactNativeWithStyledComponentsKey]
  }

  if (reactNativeIsPresent) return templateFile[reactNativeKey]

  if (styledComponentIsPresent) return templateFile[reactWithSyledComponentsKey]

  return templateFile[reactKey]
}
