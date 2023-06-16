import { z } from 'zod'

const GetUserTemplateSchema = z.object({
    headers: z.object({
        authorization: z.string().refine((string) => string.includes('Bearer')),
    }),
    params: z.object({
        userId: z.string(),
        templateId: z.string(),
    }),
})

export default GetUserTemplateSchema

export type GetUserTemplateParams = z.infer<
    typeof GetUserTemplateSchema
>['params']
