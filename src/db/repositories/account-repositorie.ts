import { Account, AddAccount, AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/controllers/account/protocols'
import { db } from '../config/knexfile'

export class AccountKnexRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, CheckAccountByEmailRepository {
    async add(data: AddAccount): Promise<Account> {
        const result = await db('accounts').insert(data)
        if (result.length > 0) {
            const account = await db('accounts').where('id', result[0]).first()
            return account
        }
        return null
    }

    async checkByEmail(email: string): Promise<boolean> {
        const account: any = await db('accounts').where('email', email).first()
        if (account?.id) {
            return true
        }
        return false
    }

    async loadByEmail(email: string): Promise<Account> {
        const account = await db('accounts')
            .where('email', email).first()
        return account
    }

    async updateAccessToken(id: number, token: string): Promise<void> {
        await db('accounts').update('access_token', token).where('id', id)
    }

    async loadByToken(token: string, type?: number): Promise<Account> {
        const account = await db('accounts')
            .where('access_token', token)
            .andWhere(function (): void {
                if (type) {
                    this.where('account_type_id', type)
                }
            }).first()
        return account
    }
}
