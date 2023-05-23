import { Request, Response } from 'express'

const handleGetSession = (req: Request, res: Response) => {
    return res.status(200).send('OK')
}

export { handleGetSession }
