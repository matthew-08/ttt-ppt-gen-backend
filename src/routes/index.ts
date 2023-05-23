import { Express, Request, Response } from 'express'
import { handleGetAllTemplates } from '../controller/template.controller'
import { UserSchema } from '../schema/user.schema'
import validateSchema from '../middleware/validateSchema'
import { handleCreateUser } from '../controller/user.controller'
import { SessionSchema } from '../schema/session.schema'
import { deserializeUser } from '../middleware/deserializeUser'
import { handleGetSession } from '../controller/session.controller'

const appRoutes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => {
        return res.status(200).send('OK')
    })

    app.get('/api/template', handleGetAllTemplates)

    app.get('/api/user', validateSchema(UserSchema))

    app.post('/api/user', validateSchema(UserSchema), handleCreateUser)

    app.get(
        '/api/session',
        validateSchema(SessionSchema),
        deserializeUser,
        handleGetSession
    )
}

export default appRoutes
