import { Authentication, Controller, HttpResponse } from '../../protocols'
import { Validation } from '@/validation/protocols'
import { AddAccount, AddAccountImplementation } from './protocols'
import { badRequest, forbidden, ok, serverError } from '@/helpers/http-helper'
import { EmailInUseError } from '@/errors'

export class AddAccountController implements Controller {
    constructor(
        private readonly addAccount: AddAccountImplementation,
        private readonly validation: Validation,
        private readonly authentication: Authentication
    ) { }

    async handle(request: AddAccount): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const {
                first_name,
                last_name,
                email,
                phone,
                password,
                date_birth,
                account_type_id,
                account_status_id
            } = request

            const account = await this.addAccount.add({
                first_name,
                last_name,
                email,
                phone,
                password,
                date_birth,
                account_type_id,
                account_status_id
            })
            if (!account) {
                return forbidden(new EmailInUseError())
            }
            const authenticationModel = await this.authentication.auth({
                email,
                password
            })
            return ok(authenticationModel)
        } catch (error) {
            return serverError(error)
        }
    }
}
