import { prismaClient } from '../db/prisma'
import { GetAllUserTemplatesInput, UserCreateTemplateInput } from '../types'
import objectEntries from '../utils/objEntries'
import * as util from 'util'

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

export const createUserTemplate = async ({
    templateId,
    templateInput,
    userId,
}: UserCreateTemplateInput) => {
    const fieldMap = {
        question: 1,
        additional: 2,
        answer: 3,
    }
    const userTemplate = await prismaClient.user_ppt_template.create({
        data: {
            user_id: userId,
            template_id: templateId,
        },
    })
    await Promise.all(
        templateInput.map(async (input, index) => {
            const slide = await prismaClient.user_ppt_template_slide.create({
                data: {
                    template_id: userTemplate.id,
                    slide_no: index,
                },
            })
            objectEntries(input).map(async (e) => {
                const fieldName = e[0]
                const fieldEntry =
                    await prismaClient.user_ppt_slide_field.create({
                        data: {
                            content: e[1],
                            slide_id: slide.id,
                            field_id: fieldMap[fieldName],
                        },
                    })
            })
        })
    )
}

export const getAllUserTemplates = async ({ id }: GetAllUserTemplatesInput) => {
    console.log(id)
    const test = await prismaClient.user_ppt_template.findMany({
        where: {
            user_id: id,
        },
        select: {
            user_id: true,
            id: true,
            created_on: true,
            times_generated: true,
            ppt_template: {
                select: {
                    id: true,
                    img: true,
                    name: true,
                },
            },
        },
    })
    console.log('TEST')
    console.log(test)
    return test
}

export { getAllTemplates, getSingleTemplate }
