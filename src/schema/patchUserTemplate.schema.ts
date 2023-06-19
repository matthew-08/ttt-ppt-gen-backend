import { number, z } from 'zod'

const PatchUserTemplateSchema = z.object({
    body: z.object({
        templateId: z.number(),
        updatedSlides: z
            .object({
                id: z.number(),
                fields: z
                    .object({
                        content: z.string(),
                        id: z.number(),
                    })
                    .array(),
            })
            .array(),
    }),
    headers: z.object({
        authorization: z.string().refine((string) => string.includes('Bearer')),
    }),
})

export default PatchUserTemplateSchema

export type PatchUserTemplateInput = z.infer<
    typeof PatchUserTemplateSchema
>['body']
