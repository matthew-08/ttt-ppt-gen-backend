import { string, z } from 'zod'

const GetTemplateSchema = z.object({
    params: z.object({
        id: string(),
    }),
    headers: z.object({
        authorization: z.string().refine((string) => string.includes('Bearer')),
    }),
})

export default GetTemplateSchema
