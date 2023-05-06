import { Router } from 'express'
import { User, UserSchema } from '../../validationSchema/user'
import errorFactory from '../../utils/errorFactory'
import { app, appDatabase } from '../..'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send('ok')
})
router.post('/', (req, res) => {
    console.log(req.body)
    const validationCheck = UserSchema.safeParse(req.body)
    if (!validationCheck.success) {
        const error = errorFactory(
            `errors/validation/${validationCheck.error.errors[0].path}`,
            validationCheck.error.errors[0].message,
            '/users'
        )
        return res.status(400).json(error)
    }
    const newUser = appDatabase.users.createUser()
    return res.status(200).send('ok')
})
router.put('/', (req, res) => {
    return res.status(200).send('ok')
})
router.delete('/', (req, res) => {
    return res.status(200).send('ok')
})
export { router as userRouter }
