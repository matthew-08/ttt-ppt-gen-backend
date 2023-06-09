import { string, z } from 'zod'

const PostUserTemplateSchema = z.object({
    body: z.object({
        templateId: z.number(),
        templateInput: z
            .object({
                question: z.string(),
                additional: z.string().optional(),
                answer: z.string().optional(),
            })
            .array(),
        name: z.string(),
    }),
    headers: z.object({
        authorization: z.string().refine((string) => string.includes('Bearer')),
    }),
    params: z.object({
        id: string(),
    }),
})

export type PostUserTemplateInput = z.infer<
    typeof PostUserTemplateSchema
>['body']

export default PostUserTemplateSchema
