import makeApp from './makeApp'
import appRoutes from './routes'

const { app, database } = makeApp({})

app.use('/user', appRoutes.user)
app.use('/ppt', appRoutes.ppt)
app.use('/pptOutline', appRoutes.pptOutline)

export { app, database }
