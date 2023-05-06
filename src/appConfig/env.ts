import * as dotenv from 'dotenv'
dotenv.config()
const env = {
    port: process.env.PORT,
}

console.log(process.env.PORT)
export default env
