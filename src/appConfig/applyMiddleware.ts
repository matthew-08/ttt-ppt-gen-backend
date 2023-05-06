import cors from 'cors'
import type { Application } from 'express'
import bodyParser from 'body-parser'
import express from 'express'

const applyMiddleware = (app: Application) => {
    app.use(express.json())
    return app
}

export default applyMiddleware
