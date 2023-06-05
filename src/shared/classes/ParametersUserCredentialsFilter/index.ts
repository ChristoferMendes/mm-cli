import { GluegunParameters } from 'gluegun'

export class ParametersUserCredentialsFilter {
  public readonly email: string | undefined
  public readonly name: string | undefined
  private readonly parameters: GluegunParameters['array']
  private readonly emailRegex = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i

  constructor(parameters: GluegunParameters) {
    this.parameters = parameters.array

    this.email = this._filterEmail()

    this.name = this._filterName()
  }

  private _filterEmail() {
    const { parameters } = this

    return parameters?.find((parameter) => parameter.match(this.emailRegex))
  }

  private _filterName() {
    const { parameters } = this

    return parameters?.find((parameter) => !parameter.match(this.emailRegex))
  }
}
