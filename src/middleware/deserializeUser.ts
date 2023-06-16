import { NextFunction, Request, Response } from 'express'
import { getTokenFromHeader } from '../utils/getTokenFromHeader'
import { IncomingHttpHeaders } from 'http'
import { verifyJwt } from '../utils/jwt'

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(req.params)
    console.log('de user')
    if (!req.headers.authorization) {
        return res.status(400).send('No authorization header')
    }
    const headerToken = getTokenFromHeader(req.headers.authorization)
    const deserializedToken = await verifyJwt(headerToken)
    if (deserializedToken.expired || !deserializedToken.decodedPayload) {
        console.log('de user 2')
        return res.status(401).send('Session expired')
    }
    res.locals.user = deserializedToken.decodedPayload
    next()
}

export { deserializeUser }
