import makeApp from './makeApp'
console.log(process.env.PORT)

const app = makeApp({})

const { server } = app
