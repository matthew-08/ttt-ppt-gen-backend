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

const getSingleTemplate = async (templateId: number) => {
    const template = await prismaClient.ppt_template.findUnique({
        where: {
            id: templateId,
        },
        include: {
            ppt_template_field: true,
        },
    })
    return template
}

export { getAllTemplates, getSingleTemplate }
