import { Express, Request, Response } from 'express'

const appRoutes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => {
        return res.status(200).send('OK')
    })
}

export default appRoutes
