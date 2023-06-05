import { join } from 'path'
import { homedir } from 'os'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { IUserConfigs } from './userConfigTypes'

class UserConfig {
  readonly USER_CONFIG_DIR = join(homedir(), '.config', 'mm-tec')
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

  read() {
    const configData = readFileSync(this.USER_CONFIG_FILE, 'utf-8')

    return JSON.parse(configData) as Partial<IUserConfigs>
  }

  readStringfy() {
    const data = this.read()

    return this._stringfy(data)
  }
}

export const userConfig = new UserConfig()
