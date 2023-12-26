import { AddAccountImplementation } from '@/domain/interfaces/account'
import { DbAddAccount } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/cryptography'
import { AccountKnexRepository } from '@/infra/database/repositories/account-repositorie'

export const makeDbAddAccount = (): AddAccountImplementation => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountKnexRepository = new AccountKnexRepository()
    return new DbAddAccount(bcryptAdapter, accountKnexRepository, accountKnexRepository)
}
