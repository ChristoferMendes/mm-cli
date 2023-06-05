import { join } from 'path'
import { homedir } from 'os'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { IUserConfigs } from './userConfigTypes'

class UserConfig {
  readonly USER_CONFIG_DIR = join(homedir(), '.config', 'mm-tec-cli')
  readonly USER_CONFIG_FILE = join(this.USER_CONFIG_DIR, 'configs.json')

  store(object: Partial<IUserConfigs>) {
    this.createConfigDir()

    const existentConfig = this.read()

    const newConfig = {
      ...existentConfig,
      ...object,
    }

    return writeFileSync(this.USER_CONFIG_FILE, this._stringfy(newConfig))
  }

  createConfigDir() {
    if (existsSync(this.USER_CONFIG_DIR)) return

    mkdirSync(this.USER_CONFIG_DIR)
  }

  private _stringfy(object: Partial<IUserConfigs>) {
    return JSON.stringify(object, null, 2)
  }

  private createConfigFile() {
    this.createConfigDir()

    const fileExist = existsSync(this.USER_CONFIG_FILE)

    if (fileExist) return

    writeFileSync(this.USER_CONFIG_FILE, this._stringfy({}))
  }

  read() {
    this.createConfigFile()

    const configData = readFileSync(this.USER_CONFIG_FILE, 'utf-8')

    return JSON.parse(configData) as Partial<IUserConfigs>
  }

  readStringfy() {
    const data = this.read()

    return this._stringfy(data)
  }

  configExists() {
    return existsSync(this.USER_CONFIG_FILE)
  }
}

export const userConfig = new UserConfig()
