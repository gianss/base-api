import config from '@/config'
import server from '@/server'

server.listen(parseInt(config.port) || 5555, () => {
    console.log(`Server is listening ${config.port || 5555}`)
})
