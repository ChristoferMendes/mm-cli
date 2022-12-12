import { PrismaClient } from "@prisma/client";
import { Command } from "gluegun/build/types/domain/command";
import { Toolbox } from "gluegun/build/types/domain/toolbox";

const prisma = new PrismaClient()

module.exports = {
  name: 'store-me',
  description: 'Store your git credentials (default is your local git credentials)',
  run: async (toolbox: Toolbox) => {
    const { parameters } = toolbox
    const emailRegex = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$', 'i')

    const name = parameters.array.filter(item => !item.match(emailRegex))[0]
    const email = parameters.array.filter(item => item.match(emailRegex))[0]

    await prisma.user.create({
      data: {
        name,
        email
      }
    })

  }
} as Command