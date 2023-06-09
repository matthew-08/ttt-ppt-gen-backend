import { UserTemplateInput } from './schema/template.schema'

export type InternalError = {
    successful: boolean
    message: string
}

export type TemplateFields = {
    type: string
}

export type Template = {
    id: number
    name: string
    img: string
    slideAmount: number
    templateFields: TemplateFields[]
}

export interface UserCreateTemplateInput extends UserTemplateInput {
    userId: number
}

export type GetAllUserTemplatesInput = {
    id: number
}

export type GetAllUserTemplatesResponse = {
    userTemplates: UserTemplateResponse[]
}

export type UserTemplateResponse = {
    templateInfo: {
        img: string
        id: number
        name: string
    }
    name: string | null
    createdOn: string | null
    timesGenerated: number | null
    id: number
}

export type GetSpecificUserTemplate = {
    templateId: number
    slides: [
        {
            slideId: number
            slideFields: [
                { fieldId: number; fieldType: string; content: string }
            ]
        }
    ]
}
