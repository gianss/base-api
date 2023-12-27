import { LoginAccountImplementation } from '@/domain/interfaces/account'
import { DbLoginAccount } from '@/domain/usecases/'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { AccountKnexRepository } from '@/infra/database/repositories/account-repositorie'
import env from '@/main/config/env'

export const makeDbLoginAccount = (): LoginAccountImplementation => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.token)
    const accountKnexRepository = new AccountKnexRepository()
    return new DbLoginAccount(bcryptAdapter, jwtAdapter, accountKnexRepository)
}
