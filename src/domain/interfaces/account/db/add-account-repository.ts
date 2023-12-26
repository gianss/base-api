import { Account } from '../common'

export interface AddAccountRepository {
    add: (data: any) => Promise<Account>
}
