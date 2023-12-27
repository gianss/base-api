import { LoadAccountByEmailRepository, LoginAccountImplementation, LoginData, TokenAccount } from '../interfaces/account'
import { Encrypter, HashComparer } from '@/infra/cryptography/protocols'

export class DbLoginAccount implements LoginAccountImplementation {
    constructor(
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter,
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    ) { }

    async login(loginData: LoginData): Promise<TokenAccount> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(loginData.email)
        if (account?.id && this.hashComparer.compare(loginData.password, account.password)) {
            const token = await this.encrypter.encrypt(account.id.toString())
            return {
                token,
                name: account.first_name
            }
        }
        return null
    }
}
