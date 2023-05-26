import { template } from '@babel/core'
import { NextFunction, Request, Response } from 'express'
import { database } from '../db/database'
import { UserTemplateInput } from '../schema/template.schema'
import errorFactory from '../utils/errorFactory'

const validateTemplate = async (
    req: Request<{}, {}, UserTemplateInput>,
    res: Response,
    next: NextFunction
) => {
    const { templateInput, templateId } = req.body
    const templateExists = await database.templates.getTemplate(templateId)
    if (!templateExists) {
        const error = errorFactory(
            'validation',
            `No template with id ${templateId} exists`,
            '/api/template'
        )
        res.status(404).send(error)
    }
    next()
}

export default validateTemplate
