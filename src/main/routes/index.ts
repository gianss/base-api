import { Router } from 'express'
import fs from 'fs'
const routes = Router()

fs.readdirSync('./src/main/routes').forEach(async (file) => {
  const fileName = file.split('.')[0]
  if (fileName === 'index') return
  if (fileName === 'config') return
  const route = await import(`./${fileName}`)
  routes.use(`/v1/${fileName}`, route.default)
})

export default routes
