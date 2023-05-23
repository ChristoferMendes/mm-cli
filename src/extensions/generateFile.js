import { getTemplate } from "../utils/getTemplate.js";

import { spawnSync } from 'child_process'

export const generateFile = (dir, fileName) => {
  const props = {
    name: fileName,
  };

  const template = getTemplate('react.hbs')
  const componentFile = template(props);
  const fullPath = `${dir}/${fileName}`
  

  spawnSync('mkdir', ['-p', `${fullPath}`])
  spawnSync('sh', ['-c', `echo "${componentFile}" > ${fullPath}/index.jsx`]);
}