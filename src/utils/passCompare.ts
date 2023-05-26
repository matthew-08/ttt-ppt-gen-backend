import { compare } from 'bcrypt'

const passCompare = async (plaintext: string, hash: string) => {
    try {
        const valid = await compare(plaintext, hash)
        if (valid) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

export { passCompare }
