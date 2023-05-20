export type InternalError = {
    successful: boolean
    message: string
}

export type TemplateFields = {
    type: 'question' | 'answer' | 'additional'
}

export type Template = {
    id: number
    name: string
    img: string
    slideAmount: string
    templateFields: TemplateFields[]
}
