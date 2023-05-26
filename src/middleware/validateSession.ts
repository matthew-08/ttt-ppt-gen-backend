import { NextFunction, Request, Response } from 'express'
import { database } from '../db/database'
import { UserCreateSessionInput } from '../schema/session.schema'
import { passCompare } from '../utils/passCompare'

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
        const valid = await passCompare(plaintextPassword, user.passhash)
        if (valid) {
            res.locals.id = user.id
            next()
        } else {
            res.status(400).send('Invalid password')
        }
    }
}

export { validateSession }
