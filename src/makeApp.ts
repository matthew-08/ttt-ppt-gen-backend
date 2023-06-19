import express from 'express'
import http from 'http'
import applyMiddleware from './appConfig/applyMiddleware'
import env from './appConfig/env'
import appRoutes from './routes'
import { database } from './db/database'

const makeApp = (appDatabase: typeof database) => {
    const app = express()
    applyMiddleware(app)

    const server = http.createServer(app)
    const port = Number(process.env.PORT) || 3000
    server.listen(port, '0.0.0.0', () => {
        console.log(`Server listening on ${port}`)
    })

    appRoutes(app)

    return {
        app,
        appDatabase,
        server,
    }
}

export default makeApp
