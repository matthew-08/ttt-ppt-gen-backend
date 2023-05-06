import { userRouter } from './user/user'
import { pptOutlineRouter } from './ppt-outline/ppt-outline'
import { pptRouter } from './ppt/ppt'

const appRoutes = {
    user: userRouter,
    pptOutline: pptOutlineRouter,
    ppt: pptRouter,
}

export default appRoutes
