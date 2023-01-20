import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')

const cli = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'mm') + ` ${cmd}`)

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain('1.0.9')
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain('1.0.9')
})
