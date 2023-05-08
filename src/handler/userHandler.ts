import { User } from '../validationSchema/user'
import { hash } from 'bcrypt'

const handleCreateUser = async (userInfo: User) => {
    const { email, password } = userInfo
    const hashPass = await hash(password, 10)
    console.log(hashPass)
}

export { handleCreateUser }
