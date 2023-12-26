import { Account } from '../common'

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, type?: number) => Promise<Account>
}
