import makeApp from './makeApp'
import database from './db/database'

const { app, appDatabase, server } = makeApp(database)

export { app, appDatabase, server }
