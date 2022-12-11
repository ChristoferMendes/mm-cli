import { Command } from "gluegun/build/types/domain/command";
import { Toolbox } from "gluegun/build/types/domain/toolbox";

module.exports = {
  name: 'store-me',
  description: 'Store your git credentials (default is your local git credentials)',
  run: async (toolbox: Toolbox) => {

  }
} as Command