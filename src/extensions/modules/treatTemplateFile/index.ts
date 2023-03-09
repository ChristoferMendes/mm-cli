import hasReactNative from '../../../shared/hasReactNative'
import { hasStyledComponents } from '../../../shared/hasStyledComponents'
import { ITreatTemplateFile } from './ITreatTemplateFile'

export async function treatTemplateFile({
  targets,
}: ITreatTemplateFile): Promise<(string | undefined)[]> {
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
      notIndexExporterTemplate,
      'styled.ejs',
    ],
    [reactNativeWithStyledComponentsKey]: [
      'react-rn-styled.ejs',
      notIndexExporterTemplate,
      'styled-rn.ejs',
    ],
  }

  const reactNativeIsPresent = await hasReactNative()
  const styledComponentIsPresent = await hasStyledComponents()

  if (reactNativeIsPresent && styledComponentIsPresent) {
    return templateFiles[reactNativeWithStyledComponentsKey]
  }

  if (reactNativeIsPresent) return templateFiles[reactNativeKey]

  if (styledComponentIsPresent) {
    return templateFiles[reactWithSyledComponentsKey]
  }

  return templateFiles[reactKey]
}
