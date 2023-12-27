import { Router } from 'express'
import { makeAddAccountController } from '@/main/factories/account/add-account-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginAccountController } from '../factories/account/login-account-controller-factory'

const app = Router()

app.post('/', adaptRoute(makeAddAccountController()))
app.post('/login', adaptRoute(makeLoginAccountController()))

export default app
