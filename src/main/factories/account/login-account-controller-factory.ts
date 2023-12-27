import { Controller } from '@/infra/protocols'
import { LoginAccountController } from '@/presentation/controllers/account/login-account-controller'
import { makeLoginAcountValidation } from './login-account-validation-factory'
import { makeDbLoginAccount } from './login-account-factory'

export const makeLoginAccountController = (): Controller => {
    return new LoginAccountController(makeDbLoginAccount(), makeLoginAcountValidation())
}
