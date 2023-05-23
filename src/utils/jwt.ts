import jwt from 'jsonwebtoken'
import appEnv from '../appConfig/env'

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, appEnv.jwtSecretKey, {
        ...(options && options),
    })
}

export function verifyJwt(token: string) {
    try {
        const decodedPayload = jwt.verify(token, appEnv.jwtSecretKey)
        return {
            valid: true,
            expired: false,
            decodedPayload,
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decodedPayload: null,
        }
    }
}
