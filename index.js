// import { genComp } from "./src/commands/gen-comp.js"
import { args } from "./src/utils/args.js"

export const main = async () => {
  const commandName = args.commandNameArg()

  const commands = {
    'gen-comp':  (await import("./src/commands/gen-comp.js")).genComp,
  }

  const commandExist = commandName in commands
  
  if (commandExist) {
    return commands[commandName]()
  }

  return console.log(`Command ${commandName} not found`)
}