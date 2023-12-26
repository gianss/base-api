import { Hasher } from '@/helpers/cryptography/protocols'
import { CheckAccountByEmailRepository, AddAccountImplementation, AddAccountRepository, Account, AddAccount } from './protocols/'

export class DbAddAccount implements AddAccountImplementation {
    constructor(
        private readonly hasher: Hasher,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
    ) { }

    async add(accountData: AddAccount): Promise<Account> {
        const exist = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
        if (!exist) {
            const hashedPassword = await this.hasher.hash(accountData.password)
            const account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
            return account
        }
        return null
    }
}
