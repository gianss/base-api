import { Account } from '../common'

export interface LoadAccountByEmailRepository {
    loadByEmail: (email: string) => Promise<Account>
}
