// Naming schema for input / output
// RequestType|Resource|Input
// RequestType|Resource|Ouput
// RequestType|Resource|Response
// Example: GetTemplateInput
//          GetUserTemplateInput
//          GetUserTemplateResponse

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

export interface UserCreateTemplateInput extends PostUserTemplateInput {
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
        slideAmount: number
    }
    name: string | null
    createdOn: string | null
    timesGenerated: number | null
    id: number
}

export type FieldTypeResponse = {
    id: number
    type: string
}

export type SlideFieldResponse = {
    id: number
    slideId: number
    fieldType: FieldTypeResponse
    content: string
}

export type SlideResponse = {
    id: number
    templateId: number
    slideNumber: number
    fields: SlideFieldResponse[]
}

export interface SingleUserTemplateResponse
    extends Omit<UserTemplateResponse, 'templateInfo'> {
    slides: SlideResponse[]
}

type PostUserTemplateInput = {}
