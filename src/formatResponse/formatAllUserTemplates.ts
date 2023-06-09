import { GetAllUserTemplatesResponse, UserTemplateResponse } from '../types'

const formatAllUserTemplates = (
    dbResponse: {
        id: number
        created_on: string | null
        times_generated: number | null
        name: string | null
        ppt_template: {
            id: number
            name: string
            img: string
        }
        user_id: number
    }[]
): UserTemplateResponse[] => {
    return dbResponse.map((template) => {
        return {
            id: template.id,
            name: template.name,
            createdOn: template.created_on,
            timesGenerated: template.times_generated,
            templateInfo: {
                id: template.ppt_template.id,
                img: template.ppt_template.img,
                name: template.ppt_template.img,
            },
        }
    })
}

export default formatAllUserTemplates
