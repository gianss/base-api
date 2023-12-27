import { Account, AddAccount, AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/domain/interfaces/account'
import { db } from '../config/knexfile'

export class AccountKnexRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, CheckAccountByEmailRepository {
    async add(data: AddAccount): Promise<Account> {
        const result = await db('account').insert(data)
        if (result.length > 0) {
            const account = await db('account').where('id', result[0]).first()
            return account
        }
        return null
    }

    async checkByEmail(email: string): Promise<boolean> {
        const account: any = await db('account').where('email', email).first()
        if (account?.id) {
            return true
        }
        return false
    }

    async loadByEmail(email: string): Promise<Account> {
        const account = await db('account')
            .where('email', email).first()
        return account
    }

    async updateAccessToken(id: number, token: string): Promise<void> {
        await db('account').update('access_token', token).where('id', id)
    }

    async loadByToken(token: string, type?: number): Promise<Account> {
        const account = await db('account')
            .where('access_token', token)
            .andWhere(function (): void {
                if (type) {
                    this.where('account_type_id', type)
                }
            }).first()
        return account
    }
}
