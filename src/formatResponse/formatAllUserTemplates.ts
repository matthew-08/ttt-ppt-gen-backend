import { GetAllUserTemplatesResponse, UserTemplateResponse } from '../types'

const formatAllUserTemplates = (
    dbResponse: {
        id: number
        ppt_template: {
            id: number
            img: string
            name: string
        }
    }[]
): UserTemplateResponse[] => {
    return dbResponse.map((template) => {
        return {
            id: template.id,
            createdOn: '',
            timesGenerated: 1,
            templateInfo: {
                id: template.ppt_template.id,
                img: template.ppt_template.img,
                name: template.ppt_template.img,
            },
        }
    })
}

export default formatAllUserTemplates
