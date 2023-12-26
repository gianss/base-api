import dotenv from 'dotenv'
import path from 'path'

const rootPath = path.resolve(__dirname, '../..')
dotenv.config({
    path: path.resolve(rootPath, process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env')
})

export default {
    secret: process.env.APP_SECRET,
    token: process.env.JWT_SECRET,
    port: process.env.PORT,
    protocol: process.env.PROTOCOL,
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        port: process.env.DB_PORT,
        client: process.env.DB_CLIENT,
        database: process.env.DB_NAME
    },
    salt: process.env.SALT_ROUNDS,
    let_key: process.env.LET_KEY,
    let_cert: process.env.LET_CERT
}
