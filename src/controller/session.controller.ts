import { Request, Response } from 'express'
import { signJwt } from '../utils/jwt'
import appEnv from '../appConfig/env'

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
    if (res.locals.user.id) {
        return res.status(401).send('Not authorized')
    }
    return res.status(200).send(res.locals.user)
}

const handleCreateSession = async (
    req: Request<{}, {}>,
    res: Response<{}, { id: number }>
) => {
    const user = res.locals
    const jwt = await signJwt(user, {
        expiresIn: appEnv.accessTokenTTL,
    })
    return res.status(200).send({
        accessToken: jwt,
        id: user.id,
    })
}

export { handleGetSession, handleCreateSession }
