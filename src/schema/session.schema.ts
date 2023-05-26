import { z } from 'zod'

const SessionSchema = z.object({
    headers: z.object({
        authorization: z.string().refine((string) => string.includes('Bearer')),
    }),
})

const CreateSessionSchema = z.object({
    body: z.object({
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string(),
    }),
})

type UserCreateSessionInput = z.infer<typeof CreateSessionSchema>['body']

export { SessionSchema, CreateSessionSchema, UserCreateSessionInput }
