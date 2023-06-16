import {
    field_type,
    user_ppt_slide_field,
    user_ppt_template,
    user_ppt_template_slide,
} from '@prisma/client'

const formatSingleUserTemplate = (
    dbResponse: (user_ppt_template & {
        user_ppt_template_slide: (user_ppt_template_slide & {
            user_ppt_slide_field: (user_ppt_slide_field & {
                field_type: field_type
            })[]
        })[]
    })[]
) => {
    return
}
