import { Account } from '../common'

export interface UpdateAccountImplementation {
    update: (data: any) => Promise<Account>
}
