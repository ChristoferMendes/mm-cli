import { print } from 'gluegun'
import { IHandleGeneratedFileOutput } from './IHandleGeneratedFileOutput'

export function handleGeneratedFileOutput({
  folder,
  name,
  extension,
  notIndexIsPresent,
}: IHandleGeneratedFileOutput): void {
  const TEMPLATE_FILE_PATH = {
    default: `${folder}/${name}/index.${extension}x`,
    notIndex: `${folder}/${name}/${name}.${extension}x`,
  }

  const generatedString = print.colors.green('GENERATED')

  const filePath = notIndexIsPresent
    ? TEMPLATE_FILE_PATH.notIndex
    : TEMPLATE_FILE_PATH.default

  const folderString = print.colors.cyan(`${filePath}`)

  return print.info(`${generatedString} ${folderString}`)
}
