import {
    field_type,
    user_ppt_slide_field,
    user_ppt_template,
    user_ppt_template_slide,
} from '@prisma/client'
import { UserTemplateResponse } from '../types'

/* const formatSingleUserTemplate = (
    dbResponse: (user_ppt_template & {
        user_ppt_template_slide: (user_ppt_template_slide & {
            user_ppt_slide_field: (user_ppt_slide_field & {
                field_type: field_type
            })[]
        })[]
    })[]
):UserTemplateResponse[] => {
    return dbResponse.map(template => {
        return {
            createdOn: template.created_on,
            id: template.id,
            name: template.name,
            
        }
    })
}
 */
