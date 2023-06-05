class Timer {
  private _startTime
  private _endTime

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

    const timeElapsedInSeconds = (this._endTime - this._startTime) / 1000

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
