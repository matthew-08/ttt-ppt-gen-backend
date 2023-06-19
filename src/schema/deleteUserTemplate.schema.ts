import { z } from 'zod'

const DeleteUserTemplateSchema = z.object({
    body: z.object({
        userId: z.number(),
        templateId: z.number(),
    }),
    headers: z.object({
        authorization: z.string().refine((string) => string.includes('Bearer')),
    }),
})

export type DeleteUserTemplateSchemaInput = z.infer<
    typeof DeleteUserTemplateSchema
>['body']

export default DeleteUserTemplateSchema
