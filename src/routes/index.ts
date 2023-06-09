import { Express, Request, Response } from 'express'
import {
    handleCreateTemplate,
    handleGetAllTemplates,
    handleGetUserTemplates,
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
import GetTemplateSchema from '../schema/getTemplate.schema'

const appRoutes = (app: Express) => {
    app.get('/healthcheck/:id/test/:id', (req: Request, res: Response) => {
        console.log(req.params)
        return res.status(200).send('OK')
    })

    //TEMPLATES
    app.get('/api/templates', handleGetAllTemplates)

    app.post(
        '/api/templates',
        validateSchema(TemplateSchema),
        validateTemplate,
        deserializeUser,
        handleCreateTemplate
    )

    //USER
    app.get('/api/users', validateSchema(UserSchema))
    app.post('/api/users', validateSchema(UserSchema), handleCreateUser)

    //USER/:ID/TEMPLATES
    //USER/:ID/TEMPLATES/:ID
    app.get(
        '/api/users/:id/templates',
        validateSchema(GetTemplateSchema),
        deserializeUser,
        handleGetUserTemplates
    )
    app.get('/api/users/:id/templates/:id')
    app.post('/api/users/:id/templates/:id')

    //SESSION
    app.get(
        '/api/sessions',
        validateSchema(SessionSchema),
        deserializeUser,
        handleGetSession
    )
    app.post(
        '/api/sessions',
        validateSchema(CreateSessionSchema),
        validateSession,
        handleCreateSession
    )
}

export default appRoutes
