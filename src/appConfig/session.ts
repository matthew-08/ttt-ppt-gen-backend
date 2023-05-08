import session from 'express-session'
import env from './env'

const instantiateSession = () => {
    if (!env.sessionSecret) {
        throw new Error(
            'Error instantiating app session, no session secret env variable found'
        )
    }
    return session({
        secret: env.sessionSecret,
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
        saveUninitialized: false,
        resave: false,
    })
}

export default instantiateSession
