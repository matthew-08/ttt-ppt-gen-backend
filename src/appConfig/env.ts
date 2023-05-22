import * as dotenv from 'dotenv'
dotenv.config()

const potentialEnv = {
    port: process.env.PORT as string,
    jwtSecretKey: process.env.JWT_SECRET_KEY as string,
    saltRounds: process.env.JWT_SALT_ROUNDS as string,
    accessTokenTTL: process.env.ACCESS_TOKEN_TTL as string,
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
