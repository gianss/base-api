import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    await knex('account_type').del()
    await knex('account_type').insert([
        { name: 'administration' },
        { name: 'user' }
    ])
    await knex('account_status').del()
    await knex('account_status').insert([
        { name: 'active' },
        { name: 'inactive' }
    ])
};
