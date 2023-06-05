import { hasDependency } from '../../../shared/hasPackage'
import { ITreatTemplateFile } from './ITreatTemplateFile'

export async function treatTemplateFile({
  targets,
}: ITreatTemplateFile): Promise<(string | undefined)[]> {
  const [, notIndexTarget] = targets

  const notIndexExporterTemplate = notIndexTarget && 'index-exporter.ejs'

  const TEMPLATE_FILES = {
    react: ['react.ejs', notIndexExporterTemplate],
    reactNative: ['react-rn.ejs', notIndexExporterTemplate],
    reactWithStyledComponents: [
      'react-styled.ejs',
      notIndexExporterTemplate,
      'styled.ejs',
    ],
    reactNativeWithSyledComponentes: [
      'react-rn-styled.ejs',
      notIndexExporterTemplate,
      'styled-rn.ejs',
    ],
  }

  const [reactNativeIsPresent, styledComponentIsPresent] = await Promise.all([
    hasDependency('react-native'),
    hasDependency('styled-components'),
  ])

  if (reactNativeIsPresent && styledComponentIsPresent) {
    return TEMPLATE_FILES.reactNativeWithSyledComponentes
  }

  if (reactNativeIsPresent) return TEMPLATE_FILES.reactNative

  if (styledComponentIsPresent) {
    return TEMPLATE_FILES.reactWithStyledComponents
  }

  return TEMPLATE_FILES.react
}
