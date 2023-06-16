import { Express, Request, Response } from 'express'
import {
    handleCreateTemplate,
    handleCreateUserTemplate,
    handleGetAllTemplates,
    handleGetAllUserTemplates,
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
import GetUserTemplatesSchema from '../schema/getTemplate.schema'
import PostUserTemplateSchema from '../schema/postUserTemplate.schema'
import endpoints from '../utils/appEndpoints'
import GetUserTemplateSchema from '../schema/getUserTemplate.schema'

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
        handleCreateTemplate
    )

    //USER
    app.get('/api/users', validateSchema(UserSchema))
    app.post('/api/users', validateSchema(UserSchema), handleCreateUser)

    //USERS/:ID/TEMPLATES
    //USERS/:ID/TEMPLATES/:ID
    app.get(
        '/api/users/:id/templates',
        validateSchema(GetUserTemplatesSchema),
        deserializeUser,
        handleGetAllUserTemplates
    )
    app.get(
        '/api/users/:userId/templates/:templateId',
        validateSchema(GetUserTemplateSchema),
        deserializeUser
    )

    app.post(
        '/api/users/:id/templates/',
        validateSchema(PostUserTemplateSchema),
        deserializeUser,
        handleCreateUserTemplate
    )

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
