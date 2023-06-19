import formatAllTemplates from '../formatResponse/formatAllTemplates'
import formatAllUserTemplates from '../formatResponse/formatAllUserTemplates'
import formatUserTemplateSlides from '../formatResponse/formatUserTemplateSlides'
import { GetUserTemplateParams } from '../schema/getUserTemplate.schema'
import { PatchUserTemplateInput } from '../schema/patchUserTemplate.schema'
import { PostUserTemplateInput } from '../schema/postUserTemplate.schema'
import { PostUserInput } from '../schema/user.schema'
import { patchSlidesService } from '../service/slide.service'
import {
    getAllTemplatesService,
    getAllUserTemplatesService,
    getTemplateService,
    getUserTemplateService,
    getUserTemplateSlidesService,
    postUserTemplateService,
} from '../service/template.service'
import { postUserService, getUserService } from '../service/user.service'
import { GetAllUserTemplatesInput, Template } from '../types'

const database = {
    users: {
        async postUser(input: PostUserInput) {
            const userExists = await getUserService(input)
            if (userExists) {
                return false
            }
            const user = await postUserService(input)
            return user
        },
        async getUser(email: string) {
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
            const dbUserTemplates = await getAllUserTemplatesService(input)
            const userTemplates = formatAllUserTemplates(dbUserTemplates)
            return userTemplates
        },
        async postUserTemplate(input: PostUserTemplateInput) {
            const userTemplate = await postUserTemplateService(input)
            return userTemplate
        },
        async getUserTemplate(input: GetUserTemplateParams) {
            const userTemplate = await getUserTemplateService(input)
            return userTemplate
        },
        slides: {
            async getUserTemplateSlides(input: GetUserTemplateParams) {
                const dbUserTemplateSlides = await getUserTemplateSlidesService(
                    input
                )
                const userTemplateSlides =
                    formatUserTemplateSlides(dbUserTemplateSlides)
                return userTemplateSlides
            },
            async patchSlides(input: PatchUserTemplateInput) {
                return await patchSlidesService(input)
            },
        },
    },
}

export { database }
