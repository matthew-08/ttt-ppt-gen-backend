import { User } from '../validationSchema/user'
import { hash } from 'bcrypt'
import { appDatabase } from '..'

const existingEmailCheck = (email: string) => {
    appDatabase.users.getUser()
}

const handleCreateUser = async (userInfo: User) => {
    const { email, password } = userInfo
    const hashPass = await hash(password, 10)
}

export { handleCreateUser }
