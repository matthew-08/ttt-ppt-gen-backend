import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    
    return res.status(200).send('ok')
})
router.post('/', (req, res) => {
    return res.status(200).send('ok')
})
router.put('/', (req, res) => {
    return res.status(200).send('ok')
})
router.delete('/', (req, res) => {
    return res.status(200).send('ok')
})
export { router as pptRouter }
