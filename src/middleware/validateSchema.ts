import { AnyZodObject } from 'zod'
import { Request, Response, NextFunction, response } from 'express'

const validateSchema =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body)
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers,
            })
            next()
        } catch (error) {
            console.log(error)
            return res.status(400).send(error)
        }
    }

export default validateSchema
