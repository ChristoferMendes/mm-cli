import hasReactNative from '../../../shared/hasReactNative'
import { hasStyledComponents } from '../../../shared/hasStyledComponents'
import { ITreatTemplateFile } from './ITreatTemplateFile'

export async function treatTemplateFile({
  toolbox,
  targets,
}: ITreatTemplateFile): Promise<string[]> {
  const { filesystem } = toolbox
  const reactKey = 'react'
  const reactNativeKey = 'reactNative'
  const reactWithSyledComponentsKey = 'reactWithStyled'
  const reactNativeWithStyledComponentsKey = 'reactNativeWithSyledComponentes'

  const [, notIndexTarget] = targets

  const notIndexExporterTemplate = notIndexTarget && 'index-exporter.ejs'

  const templateFiles = {
    [reactKey]: ['react.ejs', notIndexExporterTemplate],
    [reactNativeKey]: ['react-rn.ejs', notIndexExporterTemplate],
    [reactWithSyledComponentsKey]: [
      'react-styled.ejs',
      'styled.ejs',
      notIndexExporterTemplate,
    ],
    [reactNativeWithStyledComponentsKey]: [
      'react-rn-styled.ejs',
      'styled-rn.ejs',
      notIndexExporterTemplate,
    ],
  }

  const reactNativeIsPresent = await hasReactNative({ filesystem })
  const styledComponentIsPresent = await hasStyledComponents({ filesystem })

  if (reactNativeIsPresent && styledComponentIsPresent) {
    return templateFiles[reactNativeWithStyledComponentsKey]
  }

  if (reactNativeIsPresent) return templateFiles[reactNativeKey]

  if (styledComponentIsPresent) {
    return templateFiles[reactWithSyledComponentsKey]
  }

  return templateFiles[reactKey]
}
