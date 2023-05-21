import * as dotenv from 'dotenv'
import config from 'config'
dotenv.config()

const potentialEnv = {
    port: process.env.PORT as string,
}

export const initEnv = <T extends object>(env: T): T => {
    const findUndefined = Object.entries(env).find(
        (env) => env[1] === undefined || null
    )
    if (findUndefined) {
        throw new Error(`Environment variable undefined: ${findUndefined[0]}`)
    }
    return env
}

const appEnv = initEnv(potentialEnv)
export default appEnv
