import { Router } from 'express'
import { makeAddAccountController } from '@/main/factories/account/add-account-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'

const app = Router()

app.post('/', adaptRoute(makeAddAccountController()))

export default app
