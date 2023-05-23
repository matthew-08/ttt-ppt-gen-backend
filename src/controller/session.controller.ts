import { Request, Response } from 'express'

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

export { handleGetSession }
