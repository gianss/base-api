import { Account } from '../common'

export interface UpdateAccountRepository {
    update: (data: any) => Promise<Account>
}
