import { getAllTemplates } from '../service/template.service'
import { Template } from '../types'

const database = {
    users: {
        createUser() {},
        deleteUser() {},
        editUser() {},
        updateUser() {},
        getUser() {},
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
