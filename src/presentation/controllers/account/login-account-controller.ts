import { Controller, HttpResponse } from '../../../infra/protocols'
import { Validation } from '@/validation/protocols'
import { AddAccount, LoginAccountImplementation } from '../../../domain/interfaces/account'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import { AccessDeniedError } from '@/presentation/errors'

export class LoginAccountController implements Controller {
    constructor(
        private readonly loginAccount: LoginAccountImplementation,
        private readonly validation: Validation
    ) { }

    async handle(request: AddAccount): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const { email, password } = request

            const token = await this.loginAccount.login({
                email,
                password
            })
            if (!token) {
                return badRequest(new AccessDeniedError())
            }
            return ok(token)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
