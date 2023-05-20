import { User } from '../schema/user'
import { hash } from 'bcrypt'
import { appDatabase } from '..'
import { InternalError } from '../types'

const existingEmailCheck = (email: string) => {
    appDatabase.users.getUser()
    return false
}

const handleCreateUser = async (
    userInfo: User
): Promise<User | InternalError> => {
    const { email, password } = userInfo
    if (existingEmailCheck(email)) {
        const internalError: InternalError = {
            successful: false,
            message: 'Email already exists',
        }
        return internalError
    }
    const hashPass = await hash(password, 10)
    return {
        email,
        password: hashPass,
    }
}

export { handleCreateUser }
