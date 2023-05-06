import makeApp from './makeApp'
import appRoutes from './routes'

const { app, database } = makeApp({})

app.use('/users', appRoutes.user)
app.use('/ppt', appRoutes.ppt)
app.use('/pptOutline', appRoutes.pptOutline)

export { app, database }
