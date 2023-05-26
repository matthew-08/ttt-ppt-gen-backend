import { NextFunction, Request, Response } from 'express'
import { database } from '../db/database'
import { UserCreateSessionInput } from '../schema/session.schema'

const validateSession = async (
    req: Request<{}, {}, UserCreateSessionInput>,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body
    await database.users.fetchUser(email)
}
