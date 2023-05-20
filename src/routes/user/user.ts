import { Router } from 'express'
import { User, UserSchema } from '../../schema/user'
import errorFactory from '../../utils/errorFactory'
import { app, appDatabase } from '../..'
import { handleCreateUser } from '../../controller/user.controller'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send('ok')
})
router.post('/', async (req, res) => {
    const validationCheck = UserSchema.safeParse(req.body)
    if (!validationCheck.success) {
        const validationError = errorFactory(
            `errors/validation/${validationCheck.error.errors[0].path}`,
            validationCheck.error.errors[0].message,
            '/user'
        )
        return res.status(400).json(validationError)
    }
    const userOrError = await handleCreateUser(req.body)
    if ('message' in userOrError) {
        const existingEmailError = errorFactory(
            `errors/validation`,
            userOrError.message,
            '/user'
        )
        return res.status(400).json(existingEmailError)
    }
    const newUser = appDatabase.users.createUser()
    return res.status(200).json(newUser)
})
router.put('/', (req, res) => {
    return res.status(200).send('ok')
})
router.delete('/', (req, res) => {
    return res.status(200).send('ok')
})
export { router as userRouter }
