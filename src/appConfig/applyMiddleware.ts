import cors from 'cors'
import type { Application } from 'express'

const applyMiddleware = (app: Application) => {
    app.use(cors())
    return app
}

export default applyMiddleware
