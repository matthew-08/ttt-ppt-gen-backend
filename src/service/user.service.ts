import { prismaClient } from '../db/prisma'
import { PostUserInput } from '../schema/user.schema'
import { hashPassword } from '../utils/hashPassword'

const getUserService = async (input: PostUserInput | string) => {
    return await prismaClient.users.findUnique({
        where: {
            email: typeof input === 'string' ? input : input.email,
        },
    })
}

const createUserService = async (input: PostUserInput) => {
    const hashPass = await hashPassword(input.password)

    const newUser = await prismaClient.users.create({
        data: {
            email: input.email,
            passhash: hashPass,
        },
    })
    return {
        id: newUser.id,
    }
}

export { getUserService, createUserService }
