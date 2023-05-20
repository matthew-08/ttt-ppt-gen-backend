import { prismaClient } from '../db/prisma'

const getAllTemplates = async () => {
    const templates = await prismaClient.ppt_template.findMany({
        include: {
            ppt_template_field: {
                select: {
                    field_type: {
                        select: {
                            type: true,
                        },
                    },
                },
            },
        },
    })
    return templates
}

export { getAllTemplates }
