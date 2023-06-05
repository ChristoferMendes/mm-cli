export interface IUserConfigs {
  defaultConfigs: {
    notIndex: boolean
  }
  user: {
    name: string
    email: string
  }
  git: {
    lastRepoCloned: string | null
  }
}
