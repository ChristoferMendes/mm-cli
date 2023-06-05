import { GluegunTemplate, print } from 'gluegun'
import { nameHasSpecialCharacters } from '../../shared/nameHasSpecialCharacters'

export async function createNextPage(template: GluegunTemplate, name: string) {
  if (nameHasSpecialCharacters(name)) {
    return print.error('The page name must not contain special characters.')
  }

  await template.generate({
    template: 'next13-page.ejs',
    target: `src/app/${name}/page.tsx`,
    props: { name },
  })

  const generatedString = print.colors.green('GENERATED')
  const folderString = print.colors.cyan(`src/app/${name}/page.tsx`)
  return print.info(`${generatedString} ${folderString}`)
}
