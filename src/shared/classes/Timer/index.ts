class Timer {
  private _startTime: Date | null
  private _endTime: Date | null

  constructor() {
    this._startTime = null
    this._endTime = null
  }

  start() {
    this._startTime = new Date()
  }

  private _end() {
    this._endTime = new Date()
  }

  duration() {
    this._end()

    if (!this._endTime || !this._startTime) throw new Error('Timer not started')

    const timeElapsedInSeconds =
      (this._endTime?.getMilliseconds() - this._startTime.getMilliseconds()) /
      1000

    return timeElapsedInSeconds.toFixed(2)
  }

  durationWithString() {
    const CYAN_COLOR = '\x1b[36m'
    const RESET_COLOR = '\x1b[0m'

    return `${CYAN_COLOR}Done in:${RESET_COLOR} ${this.duration()} seconds`
  }

  printDuration() {
    console.log(`\n${this.durationWithString()}`)
  }
}

export const timer = new Timer()
