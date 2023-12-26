import config from '@/config'
import routes from '@/routes'
import express from 'express'
import * as fs from 'fs'
import * as https from 'https'
import * as http from 'http'
import cors from 'cors'

const app = express()
app.use('/public', express.static('public'))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(routes)
app.use('/uploads', express.static('uploads'))

let server: any

if (config.protocol === 'http') {
    server = http.createServer(app)
} else {
    server = https.createServer({
        key: fs.readFileSync(config.let_key),
        cert: fs.readFileSync(config.let_cert)
    }, app)
}

export default server
