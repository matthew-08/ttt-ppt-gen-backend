import { z } from 'zod'
import { database } from '../db/database'

const TemplateSchema = z.object({
    body: z.object({
        templateId: z.number({ required_error: 'No template id' }),
        templateInput: z
            .object({
                question: z.string(),
                additional: z.string().optional(),
                answer: z.string().optional(),
            })
            .array(),
    }),
})

type PostTemplateInput = z.infer<typeof TemplateSchema>['body']

export { TemplateSchema, PostTemplateInput }
