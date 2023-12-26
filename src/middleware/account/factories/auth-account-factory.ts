import config from '@/config'
import { DbAuthentication } from '@/controllers/account/usecases/db-authentication'
import { AccountKnexRepository } from '@/db/repositories/account-repositorie'
import { BcryptAdapter, JwtAdapter } from '@/helpers/cryptography'
import { Authentication } from '@/protocols/auth'

export const makeDbAuthentication = (): Authentication => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(config.token)
    const accountKnexRepository = new AccountKnexRepository()
    return new DbAuthentication(accountKnexRepository, bcryptAdapter, jwtAdapter, accountKnexRepository)
}
