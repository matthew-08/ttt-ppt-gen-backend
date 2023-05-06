import { Router } from 'express'
import { User, UserSchema } from '../../validationSchema/user'
import errorFactory from '../../utils/errorFactory'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send('ok')
})
router.post('/', (req, res) => {
    console.log(req.body)
    const validationCheck = UserSchema.safeParse(req.body)

    if (!validationCheck.success) {
        console.log(validationCheck.error.errors)
        const error = errorFactory(
            `errors/validation/${validationCheck.error.errors[0].path}`,
            validationCheck.error.errors[0].message,
            '/users'
        )
        return res.status(400).json(error)
    }
    return res.status(200).send('ok')
})
router.put('/', (req, res) => {
    return res.status(200).send('ok')
})
router.delete('/', (req, res) => {
    return res.status(200).send('ok')
})
export { router as userRouter }
