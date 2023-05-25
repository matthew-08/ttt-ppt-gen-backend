import { Request, Response } from 'express'
import { database } from '../db/database'
import { UserTemplateInput } from '../schema/template.schema'
import path from 'path'
const handleGetAllTemplates = async (req: Request, res: Response) => {
    const templates = await database.templates.fetchAllTemplates()
    if (!templates) {
        return res.status(400).end()
    }
    res.status(200).send(templates)
}

const handleCreateTemplate = async (
    req: Request<{}, {}, UserTemplateInput>,
    res: Response
) => {
    const filepath = path.join(__dirname, '../output/temp.pptx')
    res.status(200).download(filepath)
}

export { handleGetAllTemplates, handleCreateTemplate }
