import { Request, Response } from 'express'
import { database } from '../db/database'
import { PostTemplateInput } from '../schema/template.schema'
import path from 'path'
import { handleGenTemplate } from '../utils/genPpt'
import {
    createUserTemplate,
    getAllUserTemplates,
} from '../service/template.service'
import { PostUserTemplateInput } from '../schema/postUserTemplate.schema'

type DeserializedUser = {
    user: {
        id: number
    }
}

const handleGetAllTemplates = async (req: Request, res: Response) => {
    const templates = await database.templates.fetchAllTemplates()
    if (!templates) {
        return res.status(400).end()
    }
    res.status(200).send(templates)
}

const handleCreateTemplate = async (
    req: Request<{}, {}, PostTemplateInput>,
    res: Response<{}, DeserializedUser>
) => {
    console.log('in controller')
    console.log('IN HANDLE CREATE TEMPLATE')
    console.log(res.locals.user)

    const { templateId, templateInput } = req.body

    await handleGenTemplate(templateId, templateInput)
    const filepath = path.join(__dirname, '../output/temp.pptx')
    console.log(res.locals)
    console.log(res.locals.user)
    res.status(200).download(filepath)
}

const handleGetUserTemplates = async (
    req: Request<{}, {}, UserTemplateInput>,
    res: Response<{}, DeserializedUser>
) => {
    console.log(res.locals.user.id)
    const userTemplates = database.templates.fetchAllUserTemplates({
        id: res.locals.user.id,
    })
    return res.status(200).send(userTemplates)
}

const handleCreateUserTemplate = async (
    req: Request<{}, {}, PostUserTemplateInput>,
    res: Response<{}, DeserializedUser>
) => {
    const { id: userId } = res.locals.user
    const { name, templateId, templateInput } = req.body

    await createUserTemplate({
        templateId,
        templateInput,
        userId: res.locals.user.id,
    })
}

export {
    handleGetAllTemplates,
    handleCreateTemplate,
    handleGetUserTemplates,
    handleCreateUserTemplate,
}
