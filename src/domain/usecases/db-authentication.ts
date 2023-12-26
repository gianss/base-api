import { Authentication } from '@/infra/protocols'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '../interfaces/account'
import { Encrypter, HashComparer } from '@/infra/cryptography/protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth(authenticationParams: any): Promise<any> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id.toString())
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return {
          accessToken,
          first_name: account.first_name
        }
      }
    }
    return null
  }
}
