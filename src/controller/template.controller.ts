import { Request, Response } from 'express'
import { database } from '../db/database'
import { UserTemplateInput } from '../schema/template.schema'
import path from 'path'
import { handleGenTemplate } from '../utils/genPpt'
import {
    createUserTemplate,
    getAllUserTemplates,
} from '../service/template.service'

type DeserializedUser = {
    user: {
        id: string
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
    req: Request<{}, {}, UserTemplateInput>,
    res: Response<{}, DeserializedUser>
) => {
    console.log('in controller')
    console.log('IN HANDLE CREATE TEMPLATE')
    console.log(res.locals.user)

    const { templateId, templateInput } = req.body
    await createUserTemplate({
        templateId,
        templateInput,
        userId: res.locals.user.id,
    })

    await handleGenTemplate(templateId, templateInput)
    const filepath = path.join(__dirname, '../output/temp.pptx')
    console.log('returning file')
    console.log(res.locals)
    console.log(res.locals.user)
    res.status(200).download(filepath)
}

const handleGetUserTemplates = async (
    req: Request<{}, {}, UserTemplateInput>,
    res: Response<{}, DeserializedUser>
) => {
    await getAllUserTemplates({
        id: Number(res.locals.user.id),
    })
}

export { handleGetAllTemplates, handleCreateTemplate, handleGetUserTemplates }
