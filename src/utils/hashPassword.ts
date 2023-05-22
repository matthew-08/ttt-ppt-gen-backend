import { hash } from 'bcrypt'
import { env } from 'process'
import appEnv from '../appConfig/env'

const hashPassword = async (plaintextPass: string) => {
    const hashedPass = await hash(plaintextPass, Number(appEnv.saltRounds))
}
