import { CreateUserInput, User } from '../schema/user.schema'
import { hash } from 'bcrypt'
import { appDatabase } from '..'
import { InternalError } from '../types'
import { Request, Response } from 'express'
import { database } from '../db/database'
import errorFactory from '../utils/errorFactory'
import { signJwt } from '../utils/jwt'
import appEnv from '../appConfig/env'

const handleCreateUser = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response
) => {
    const newUser = await database.users.createUser(req.body)
    if (!newUser) {
        console.log(newUser)
        const error = errorFactory(
            'validation',
            'email already exists',
            '/api/users'
        )
        return res.status(400).send(error)
    }
    console.log('test')
    const jwt = await signJwt(newUser, {
        expiresIn: appEnv.accessTokenTTL,
    })
    return res.status(200).send({
        accessToken: jwt,
        id: newUser.id,
    })
}

export { handleCreateUser }
