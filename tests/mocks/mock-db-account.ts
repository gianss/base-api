import { Account, AddAccount, AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/domain/interfaces/account'
import { mockAccount } from './mock-account'

export class AddAccountRepositorySpy implements AddAccountRepository {
    params: AddAccount
    async add(params: AddAccount): Promise<Account> {
        this.params = params
        return mockAccount()
    }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
    email: string
    result = false
    async checkByEmail(email: string): Promise<boolean> {
        this.email = email
        return this.result
    }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
    id: number
    token: string
    async updateAccessToken(id: number, token: string): Promise<void> {
        this.id = id
        this.token = token
    }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
    email: string
    result = mockAccount()

    async loadByEmail(email: string): Promise<Account> {
        this.email = email
        return this.result
    }
}
