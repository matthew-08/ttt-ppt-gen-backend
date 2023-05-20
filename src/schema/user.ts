import { infer, z } from 'zod'
import validator from 'validator'

const UserSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(10, 'Password is too short')
        .refine(
            (pass) =>
                validator.isStrongPassword(pass, {
                    returnScore: false,
                    minUppercase: 1,
                    minSymbols: 1,
                }),
            {
                message:
                    'Password must contain at least 1 upper case letter and 1 symbol',
            }
        ),
})

type User = z.infer<typeof UserSchema>

export { User, UserSchema }
