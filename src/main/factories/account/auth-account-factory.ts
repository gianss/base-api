import config from '@/main/config/env'
import { DbAuthentication } from '@/domain/usecases/db-authentication'
import { AccountKnexRepository } from '@/infra/database/repositories/account-repositorie'
import { Authentication } from '@/infra/protocols/auth'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'

export const makeDbAuthentication = (): Authentication => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(config.token)
    const accountKnexRepository = new AccountKnexRepository()
    return new DbAuthentication(accountKnexRepository, bcryptAdapter, jwtAdapter, accountKnexRepository)
}
