import { prismaClient } from '../db/prisma'
import { PatchUserTemplateInput } from '../schema/patchUserTemplate.schema'

const patchSlidesService = async ({
    templateId,
    updatedSlides,
}: PatchUserTemplateInput) => {
    await Promise.all(
        updatedSlides.map(async (slide) => {
            return await Promise.all(
                slide.fields.map(async (field) => {
                    return await prismaClient.user_ppt_slide_field.update({
                        data: {
                            content: field.content,
                        },
                        where: {
                            id: field.id,
                        },
                    })
                })
            )
        })
    )
}

export { patchSlidesService }
