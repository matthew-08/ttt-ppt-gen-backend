import { z } from 'zod'

const SessionSchema = z.object({
    headers: z.object({
        authorization: z.string().refine((string) => string.includes('Bearer')),
    }),
})

export { SessionSchema }
