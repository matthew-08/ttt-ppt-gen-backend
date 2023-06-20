import { Express, Request, Response } from 'express'
import {
    handleCreateTemplate,
    handleCreateUserTemplate,
    handleDeleteUserTemplate,
    handleGetAllTemplates,
    handleGetAllUserTemplates,
    handleGetUserTemplate,
    handleGetUserTemplateSlides,
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
import GetUserTemplateSchema from '../schema/getUserTemplate.schema'
import PatchUserTemplateSchema from '../schema/patchUserTemplate.schema'
import { handlePatchSlides } from '../controller/slides.controller'
import DeleteUserTemplateSchema from '../schema/deleteUserTemplate.schema'

const appRoutes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => {
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

    //USERS
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
    app.post(
        '/api/users/:id/templates/',
        validateSchema(PostUserTemplateSchema),
        deserializeUser,
        handleCreateUserTemplate
    )
    app.get(
        '/api/users/:userId/templates/:templateId',
        validateSchema(GetUserTemplateSchema),
        deserializeUser,
        handleGetUserTemplate
    )

    //USERS/:ID/TEMPLATES/:ID/SLIDES
    app.get(
        '/api/users/:userId/templates/:templateId/slides',
        validateSchema(GetUserTemplateSchema),
        deserializeUser,
        handleGetUserTemplateSlides
    )
    app.patch(
        '/api/users/:userId/templates/:templateId/slides',
        validateSchema(PatchUserTemplateSchema),
        deserializeUser,
        handlePatchSlides
    )
    app.delete(
        '/api/users/:id/templates/:templateId',
        validateSchema(DeleteUserTemplateSchema),
        deserializeUser,
        handleDeleteUserTemplate
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
