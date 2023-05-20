import express from 'express'
import http from 'http'
import applyMiddleware from './appConfig/applyMiddleware'
import env from './appConfig/env'
import database from './db/database'
import appRoutes from './routes'

const makeApp = (appDatabase: typeof database) => {
    const app = express()
    applyMiddleware(app)

    const server = http.createServer(app)
    server.listen(env.port, () => {
        console.log(`Server is listening on ${env.port}`)
    })
    appRoutes(app)

    return {
        app,
        appDatabase,
        server,
    }
}

export default makeApp
