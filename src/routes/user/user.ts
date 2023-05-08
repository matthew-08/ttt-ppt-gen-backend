import { Router } from 'express'
import { User, UserSchema } from '../../validationSchema/user'
import errorFactory from '../../utils/errorFactory'
import { app, appDatabase } from '../..'
import { handleCreateUser } from '../../handler/userHandler'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send('ok')
})
router.post('/', (req, res) => {
    const validationCheck = UserSchema.safeParse(req.body)
    if (!validationCheck.success) {
        const validationError = errorFactory(
            `errors/validation/${validationCheck.error.errors[0].path}`,
            validationCheck.error.errors[0].message,
            '/users'
        )
        return res.status(400).json(validationError)
    }
    const createUser = handleCreateUser(req.body)
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
