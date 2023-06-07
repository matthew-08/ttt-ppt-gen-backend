import { UserTemplateInput } from "./schema/template.schema"

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