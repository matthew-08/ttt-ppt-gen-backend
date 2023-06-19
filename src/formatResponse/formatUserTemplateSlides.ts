import { SlideFieldResponse, SlideResponse } from '../types'

type user_ppt_slide_field = {
    id: number
    slide_id: number
    field_id: number
    content: string | null
}

type user_ppt_template_slide = {
    id: number
    template_id: number
    slide_no: number | null
}
type field_type = {
    id: number
    type: string
}

const formatUserTemplateSlides = (
    slides: (user_ppt_template_slide & {
        user_ppt_slide_field: (user_ppt_slide_field & {
            field_type: field_type
        })[]
    })[]
): SlideResponse[] => {
    return slides.map((slide) => {
        return {
            templateId: slide.template_id,
            id: slide.id,
            fields: slide.user_ppt_slide_field.map((slide) => {
                return {
                    content: slide.content,
                    fieldType: slide.field_type,
                    id: slide.id,
                    slideId: slide.slide_id,
                }
            }) as SlideFieldResponse[],
            slideNumber: slide.slide_no as number,
        }
    })
}

export default formatUserTemplateSlides
