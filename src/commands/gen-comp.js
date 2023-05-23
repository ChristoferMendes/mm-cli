import { cancel, spinner } from '@clack/prompts'
import { spawnSync } from 'child_process';

import { args } from '../utils/args.js';
import { generateFile } from '../extensions/generateFile.js';

export const genComp = () => {
  const componentName = args.first()
  
  if (!componentName) {
    return cancel('You must provide a name for the component')
  }

  const loading = spinner()
  loading.start('Loading')
 
  const dir = 'src/components'
  const fullPath = `${dir}/${componentName}/index.jsx`

  generateFile(dir, componentName)
 
  const GREEN_COLOR = '\x1b[32m'
  const WHITE_COLOR = '\x1b[97m'
  const END_COLOR = '\x1b[0m'
  
  loading.stop(`${GREEN_COLOR}[GENERATED]${END_COLOR} ${WHITE_COLOR}${fullPath}`)
}