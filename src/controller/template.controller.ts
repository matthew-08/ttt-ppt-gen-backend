import { Request, response, Response } from 'express'
import { database } from '../db/database'
import { PostTemplateInput } from '../schema/template.schema'
import path from 'path'
import { handleGenTemplate } from '../utils/genPpt'
import { PostUserTemplateInput } from '../schema/postUserTemplate.schema'
import { GetAllUserTemplatesInput } from '../types'
import { GetUserTemplateParams } from '../schema/getUserTemplate.schema'
import { request } from 'http'
import { DeleteUserTemplateSchemaInput } from '../schema/deleteUserTemplate.schema'
import * as fs from 'fs/promises'

type DeserializedUser = {
    user: {
        id: number
    }
}

const handleGetAllTemplates = async (req: Request, res: Response) => {
    const templates = await database.templates.getAllTemplates()
    if (!templates) {
        return res.status(400).end()
    }
    res.status(200).send(templates)
}

const handleCreateTemplate = async (
    req: Request<{}, {}, PostTemplateInput>,
    res: Response<{}, DeserializedUser>
) => {
    console.log(res.locals.user)

    const { templateId, templateInput } = req.body

    await handleGenTemplate(templateId, templateInput)
    const filepath = path.join(__dirname, '../output/temp.pptx')
    /* const files = await fs.readdir('../output')
    files.forEach((f) => {
        console.log(f)
    }) */
    console.log(__dirname)
    console.log('DIRNAME')
    res.status(200).download(filepath)
}

const handleGetAllUserTemplates = async (
    req: Request<{}, {}, GetAllUserTemplatesInput>,
    res: Response<{}, DeserializedUser>
) => {
    console.log(res.locals.user.id)
    const userTemplates = await database.templates.getAllUserTemplates({
        id: res.locals.user.id,
    })
    console.log(userTemplates)
    return res.status(200).send(userTemplates)
}

const handleCreateUserTemplate = async (
    req: Request<{}, {}, PostUserTemplateInput>,
    res: Response<{}, DeserializedUser>
) => {
    const { id: userId } = res.locals.user
    const { name, templateId, templateInput } = req.body
    const newUserTemplate = await database.templates.postUserTemplate({
        name,
        templateId,
        templateInput,
        userId,
    })
    return res.status(200).send()
}

const handleGetUserTemplate = async (
    req: Request<GetUserTemplateParams>,
    res: Response<{}, DeserializedUser>
) => {
    const input = req.params
    console.log('test')
    const userTemplate = await database.templates.getUserTemplate(input)
    return res.status(200).send()
}

const handleGetUserTemplateSlides = async (
    req: Request<GetUserTemplateParams>,
    res: Response<{}, DeserializedUser>
) => {
    const input = req.params
    const userTemplateSlides =
        await database.templates.slides.getUserTemplateSlides(input)
    return res.status(200).send(userTemplateSlides)
}

const handleDeleteUserTemplate = async (
    req: Request<{}, {}, DeleteUserTemplateSchemaInput>,
    res: Response<{}, DeserializedUser>
) => {
    const input = req.body
    await database.templates.deleteUserTemplate(input)
    return res.status(200).send({
        message: 'Template deleted',
    })
}

export {
    handleGetAllTemplates,
    handleCreateTemplate,
    handleGetAllUserTemplates,
    handleCreateUserTemplate,
    handleGetUserTemplate,
    handleGetUserTemplateSlides,
    handleDeleteUserTemplate,
}
