import { NextFunction, Request, Response } from 'express'
import { database } from '../db/database'
import { UserCreateSessionInput } from '../schema/session.schema'
import errorFactory from '../utils/errorFactory'
import { passCompare } from '../utils/passCompare'

const validateSession = async (
    req: Request<{}, {}, UserCreateSessionInput>,
    res: Response,
    next: NextFunction
) => {
    const { email, password: plaintextPassword } = req.body
    const user = await database.users.getUser(email)
    if (!user) {
        const error = errorFactory(
            'Validation',
            'Invalid email',
            '/api/session'
        )
        res.status(400).json(error)
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
