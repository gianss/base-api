import { Router } from 'express'
import fs from 'fs'
const routes = Router()

fs.readdirSync('./src/routes').forEach(async (file) => {
  const fileName = file.split('.')[0]
  const [routeName] = fileName.split('/')
  if (fileName === 'index') return
  const route = await import(`./${file}/${fileName}`)
  routes.use(`/v1/${routeName}`, route.default)
})

export default routes
