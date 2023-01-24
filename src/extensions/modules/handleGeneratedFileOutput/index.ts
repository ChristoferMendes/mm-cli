import { print } from 'gluegun'
import { IHandleGeneratedFileOutput } from './IHandleGeneratedFileOutput'

export function handleGeneratedFileOutput({
  folder,
  name,
  extension,
  notIndexIsPresent,
}: IHandleGeneratedFileOutput): void {
  const defaultKey = 'default'
  const notIndexKey = 'notIndex'

  const templateFilePath = {
    [defaultKey]: `${folder}/${name}/index.${extension}x`,
    [notIndexKey]: `${folder}/${name}/${name}.${extension}x`,
  }

  const generatedString = print.colors.green('GENERATED')

  const filePath = notIndexIsPresent
    ? templateFilePath[notIndexKey]
    : templateFilePath[defaultKey]

  const folderString = print.colors.cyan(`${filePath}`)

  return print.info(`${generatedString} ${folderString}`)
}
