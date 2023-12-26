import { Controller } from '@/protocols'
import { makeDbAddAccount } from './factories/add-account-factory'
import { makeAddAcountUpValidation } from './factories/add-account-validation-factory'
import { makeDbAuthentication } from './factories/auth-account-factory'
import { AddAccountController } from '@/controllers/account/add-account-controller'

export const makeAddAccountController = (): Controller => {
    return new AddAccountController(makeDbAddAccount(), makeAddAcountUpValidation(), makeDbAuthentication())
}
