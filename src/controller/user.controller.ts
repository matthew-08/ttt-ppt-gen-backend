import { User } from '../schema/user.schema'
import { hash } from 'bcrypt'
import { appDatabase } from '..'
import { InternalError } from '../types'
import { Request, Response } from 'express'

const handleCreateUser = (req: Request, res: Response) => {
    return res.status(200).send('ok')
}

export { handleCreateUser }
