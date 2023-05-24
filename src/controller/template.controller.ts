import { Request, Response } from 'express'
import { database } from '../db/database'

const handleGetAllTemplates = async (req: Request, res: Response) => {
    const templates = await database.templates.fetchAllTemplates()
    if (!templates) {
        return res.status(400).end()
    }
    res.status(200).send(templates)
}

const handleCreateTemplate = async (req: Request, res: Response) => {}

export { handleGetAllTemplates, handleCreateTemplate }
