import * as dotenv from 'dotenv'
dotenv.config()
const env = {
    port: process.env.PORT,
    sessionSecret: process.env.SESSION_SECRET,
}
export default env
