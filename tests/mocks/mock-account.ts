import { Account, AddAccount } from '@/controllers/account/protocols'

export const mockAccount = (): Account => ({
    id: 1,
    first_name: 'any_first_name',
    last_name: 'any_last_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    phone: '(00)3431-4915',
    date_birth: '1993-07-10',
    account_status_id: 1,
    account_type_id: 1,
    status_name: 'active',
    type_name: 'administration',
    access_token: 'any_token'
})

export const mockAddAccountParams = (): AddAccount => ({
    first_name: 'any_first_name',
    last_name: 'any_last_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    phone: '(00)3431-4915',
    date_birth: '1993-07-10',
    account_status_id: 1,
    account_type_id: 1
})
