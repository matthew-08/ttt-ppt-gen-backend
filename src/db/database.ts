import formatAllTemplates from '../formatResponse/formatAllTemplates'
import { PostUserInput } from '../schema/user.schema'
import {
    getAllTemplatesService,
    getAllUserTemplatesService,
    getTemplateService,
} from '../service/template.service'
import { createUserService, getUserService } from '../service/user.service'
import { GetAllUserTemplatesInput, Template } from '../types'

const database = {
    users: {
        async getUser(input: PostUserInput) {
            const userExists = await getUserService(input)
            if (userExists) {
                return false
            }
            const user = await createUserService(input)
            return user
        },
        async postUser(email: string) {
            const user = await getUserService(email)
            if (!user) {
                return false
            }
            return user
        },
    },
    templates: {
        async getAllTemplates(): Promise<Template[]> {
            const dbTemplates = await getAllTemplatesService()
            const templates = formatAllTemplates(dbTemplates)
            return templates
        },
        async getTemplate(templateId: number) {
            const template = await getTemplateService(templateId)
            return template
        },
        async getAllUserTemplates(input: GetAllUserTemplatesInput) {
            const userTemplates = await getAllUserTemplatesService(input)
            return userTemplates
        },
    },
}

export { database }
