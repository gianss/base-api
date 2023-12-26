import { Router } from 'express'
import { adaptRoute } from './config/route-adapter'
import { makeAddAccountController } from '@/middleware/account/add-account-middleware'

const app = Router()

app.get('/', adaptRoute(makeAddAccountController()))

export default app
