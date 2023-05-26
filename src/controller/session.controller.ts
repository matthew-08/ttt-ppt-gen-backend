import { Request, Response } from 'express'
import { UserCreateSessionInput } from '../schema/session.schema'

const handleGetSession = (
    req: Request,
    res: Response<
        {},
        {
            user: {
                id: number
            }
        }
    >
) => {
    if (!res.locals.user.id) {
        return res.status(401).send('Not authorized')
    }
    return res.status(200).send(res.locals.user)
}

const handleCreateSession = (
    req: Request<{}, {}, UserCreateSessionInput>,
    res: Response
) => {}

export { handleGetSession, handleCreateSession }
