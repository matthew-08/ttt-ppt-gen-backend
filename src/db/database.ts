import { CreateUserInput } from '../schema/user.schema'
import { getAllTemplates } from '../service/template.service'
import { getUser } from '../service/user.service'
import { Template } from '../types'

const database = {
    users: {
        async createUser(input: CreateUserInput) {
            const checkExistingUser = await getUser(input)
            if (!checkExistingUser) {
                return false
            } else return true
        },
    },
    templates: {
        async fetchAllTemplates(): Promise<Template[]> {
            const templates = await getAllTemplates()
            return templates.map(
                ({ id, name, img, ppt_template_field, slide_amount }) => {
                    return {
                        id,
                        name,
                        img,
                        slideAmount: Number(slide_amount),
                        templateFields: ppt_template_field.map(
                            (field) => field.field_type
                        ),
                    }
                }
            )
        },
    },
}

export { database }
