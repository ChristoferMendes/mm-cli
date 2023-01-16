import { print } from 'gluegun'

export const timerString = (
  timerElapsedInMilliseconds: () => number
): string => {
  const millisecondsToSeconds = timerElapsedInMilliseconds() / 1000
  const fixedSeconds = millisecondsToSeconds.toFixed(2)

  return print.colors.cyan(`${fixedSeconds} seconds.`)
}
