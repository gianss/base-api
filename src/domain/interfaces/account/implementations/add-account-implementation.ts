import { Account } from '../common'

export interface AddAccountImplementation {
    add: (data: any) => Promise<Account>
}
