import formatAllTemplates from '../formatResponse/formatAllTemplates'
import { UserCreateSessionInput } from '../schema/session.schema'
import { CreateUserInput } from '../schema/user.schema'
import {
    getAllTemplates,
    getAllUserTemplates,
    getSingleTemplate,
} from '../service/template.service'
import { createNewUser, getUser } from '../service/user.service'
import { GetAllUserTemplatesInput, Template } from '../types'

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
            const dbTemplates = await getAllTemplates()
            const templates = formatAllTemplates(dbTemplates)
            return templates
        },
        async getTemplate(templateId: number) {
            const template = await getSingleTemplate(templateId)
            return template
        },
        async fetchAllUserTemplates(input: GetAllUserTemplatesInput) {
            const data = await getAllUserTemplates(input)
        },
    },
}

export { database }
