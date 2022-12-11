import { IHaveStyledComponent } from './haveStyledComponent'

export async function haveStyledComponent({
  filesystem,
}: IHaveStyledComponent): Promise<boolean> {
  const packageJson = await filesystem.read('package.json', 'json')

  return !!packageJson.dependencies['styled-components']
}
