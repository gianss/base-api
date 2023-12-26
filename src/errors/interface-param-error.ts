export class InterfaceParamError extends Error {
  constructor(paramName: string, typeExpected: string) {
    super(`interface format invalid: ${paramName}. Type expected: ${typeExpected}`)
    this.name = 'MissingParamError'
  }
}
