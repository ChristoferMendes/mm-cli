class Args {
  all() {
    const args = process.argv.slice(3);

    return args
  }

  first() {
    const [firstArg] = process.argv.slice(3)

    return firstArg;
  }

  commandNameArg() {
    const [, , commandName] = process.argv;

    return commandName;
  }
}

export const args = new Args();