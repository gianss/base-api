import * as path from 'path'
import config from '../../config'

module.exports = {
    client: config.database.client,
    connection: {
        host: config.database.host,
        user: config.database.user,
        password: config.database.pass,
        database: config.database.database
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: path.resolve(__dirname, '../migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '../seeders')
    }
}