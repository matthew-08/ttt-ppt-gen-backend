import makeApp from './makeApp'
console.log(process.env.PORT)

const { app, database } = makeApp({})

app.listen()

export { app, database }
