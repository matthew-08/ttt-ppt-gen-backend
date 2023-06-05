import { Express, Request, Response } from 'express'
import {
    handleCreateTemplate,
    handleGetAllTemplates,
} from '../controller/template.controller'
import { UserSchema } from '../schema/user.schema'
import validateSchema from '../middleware/validateSchema'
import { handleCreateUser } from '../controller/user.controller'
import { CreateSessionSchema, SessionSchema } from '../schema/session.schema'
import { deserializeUser } from '../middleware/deserializeUser'
import {
    handleCreateSession,
    handleGetSession,
} from '../controller/session.controller'
import { TemplateSchema } from '../schema/template.schema'
import validateTemplate from '../middleware/validateTemplate'
import { validateSession } from '../middleware/validateSession'

const appRoutes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => {
        return res.status(200).send('OK')
    })

    //TEMPLATES
    app.get('/api/template', handleGetAllTemplates)

    app.post(
        '/api/template',
        validateSchema(TemplateSchema),
        validateTemplate,
        handleCreateTemplate
    )

    //USER
    app.get('/api/user', validateSchema(UserSchema))
    app.post('/api/user', validateSchema(UserSchema), handleCreateUser)

    //SESSION
    app.get(
        '/api/session',
        validateSchema(SessionSchema),
        deserializeUser,
        handleGetSession
    )
    app.post(
        '/api/session',
        validateSchema(CreateSessionSchema),
        validateSession,
        handleCreateSession
    )
}

export default appRoutes
