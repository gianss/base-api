import { Account, AddAccount, AddAccountRepository, CheckAccountByEmailRepository } from '@/controllers/account/protocols'
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
