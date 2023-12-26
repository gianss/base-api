import { AddAccountImplementation } from '@/controllers/account/protocols'
import { DbAddAccount } from '@/controllers/account/usecases'
import { AccountKnexRepository } from '@/db/repositories/account-repositorie'
import { BcryptAdapter } from '@/helpers/cryptography'

export const makeDbAddAccount = (): AddAccountImplementation => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountKnexRepository = new AccountKnexRepository()
    return new DbAddAccount(bcryptAdapter, accountKnexRepository, accountKnexRepository)
}
