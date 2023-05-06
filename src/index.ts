import makeApp from './makeApp'
import appRoutes from './routes'
import database from './db/database'

const { app, appDatabase, server } = makeApp(database)

app.use('/user', appRoutes.user)
app.use('/ppt', appRoutes.ppt)
app.use('/pptOutline', appRoutes.pptOutline)

export { app, appDatabase, server }
