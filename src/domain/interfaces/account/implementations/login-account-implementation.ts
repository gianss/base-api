import { TokenAccount } from '../common'

export interface LoginAccountImplementation {
    login: (data: any) => Promise<TokenAccount>
}
