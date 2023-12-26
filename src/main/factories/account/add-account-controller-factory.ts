import { Controller } from '@/infra/protocols'
import { makeDbAddAccount } from './add-account-factory'
import { makeAddAcountUpValidation } from './add-account-validation-factory'
import { makeDbAuthentication } from './auth-account-factory'
import { AddAccountController } from '@/presentation/controllers/account/add-account-controller'

export const makeAddAccountController = (): Controller => {
    return new AddAccountController(makeDbAddAccount(), makeAddAcountUpValidation(), makeDbAuthentication())
}
