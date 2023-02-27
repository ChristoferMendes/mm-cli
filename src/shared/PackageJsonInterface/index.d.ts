export interface IPackageJson {
  dependencies: {
    [key: string]: string
  }
  devDependencies: {
    [key: string]: string
  }
  name: string
}
