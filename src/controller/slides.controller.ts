import { Request, Response } from 'express'
import { database } from '../db/database'
import { PatchUserTemplateInput } from '../schema/patchUserTemplate.schema'

const handlePatchSlides = async (
    req: Request<{}, {}, PatchUserTemplateInput>,
    res: Response
) => {
    const input = req.body
    await database.templates.slides.patchSlides(input)
    return res.status(200).send('ok')
}

export { handlePatchSlides }
