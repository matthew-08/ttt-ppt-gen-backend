import { UserCreateSessionInput } from '../schema/session.schema'
import { CreateUserInput } from '../schema/user.schema'
import { getAllTemplates, getSingleTemplate } from '../service/template.service'
import { createNewUser, getUser } from '../service/user.service'
import { Template } from '../types'

const database = {
    users: {
        async createUser(input: CreateUserInput) {
            const userExists = await getUser(input)
            if (userExists) {
                return false
            }
            const user = await createNewUser(input)
            return user
        },
        async fetchUser(email: string) {
            const user = await getUser(email)
            if (!user) {
                return false
            }
            return user
        },
    },
    templates: {
        async fetchAllTemplates(): Promise<Template[]> {
            const templates = await getAllTemplates()
            const t = templates.map(
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
            return t.filter((t) => t.id !== 3)
        },
        async getTemplate(templateId: number) {
            const template = await getSingleTemplate(templateId)
            return template
        },
    },
}

export { database }
