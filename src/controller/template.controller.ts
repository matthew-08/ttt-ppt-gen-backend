import { Request, Response } from 'express'
import { database } from '../db/database'

const handleGetAllTemplates = async (req: Request, res: Response) => {
    const templates = await database.templates.fetchAllTemplates()
    res.send(200).json(templates)
}

export { handleGetAllTemplates }
