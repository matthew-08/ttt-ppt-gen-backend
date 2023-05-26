import { NextFunction, Request, Response } from 'express'
import { database } from '../db/database'
import { UserCreateSessionInput } from '../schema/session.schema'
import { compare } from 'bcrypt'

const validateSession = async (
    req: Request<{}, {}, UserCreateSessionInput>,
    res: Response,
    next: NextFunction
) => {
    const { email, password: plaintextPassword } = req.body
    const user = await database.users.fetchUser(email)
    if (!user) {
        res.status(400).send('Invalid email')
    } else {
        try {
            const pass = await compare(plaintextPassword, user.passhash)
            if (!pass) {
                return res.status(400).send('Invalid password')
            }
            next()
        } catch (error) {
            return res.status(400).send('Invalid password')
        }
    }
}

export { validateSession }
