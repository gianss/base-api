import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return await knex.schema
        .createTable('account_type', function (table) {
            table.increments('id').primary()
            table.string('name', 12).notNullable()
        })
        .createTable('account_status', function (table) {
            table.increments('id').primary()
            table.string('name', 12).notNullable()
        })
        .createTable('account', function (table) {
            table.increments('id').primary()
            table.string('first_name', 30).notNullable()
            table.string('last_name', 90).notNullable()
            table.string('email', 145).notNullable()
            table.integer('phone').notNullable()
            table.string('password', 200).notNullable()
            table.string('date_birth').nullable()
            table.integer('account_type_id').notNullable()
            table.integer('account_status_id').notNullable().defaultTo(1)
            table.foreign('account_type_id').references('id').inTable('account_type')
            table.foreign('account_status_id').references('id').inTable('account_status')
        })
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema
        .dropTable('account')
        .dropTable('account_status')
        .dropTable('account_type')
}
