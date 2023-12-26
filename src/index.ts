import config from '@/main/config/env'
import server from './main/server'

server.listen(parseInt(config.port) || 5555, () => {
    console.log(`Server is listening ${config.port || 5555}`)
})
