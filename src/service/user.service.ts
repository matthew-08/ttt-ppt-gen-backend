import { prismaClient } from '../db/prisma'
import { CreateUserInput } from '../schema/user.schema'
import { hashPassword } from '../utils/hashPassword'

const getUser = async (input: CreateUserInput) => {
    return await prismaClient.users.findFirst({
        where: {
            email: input.email,
        },
    })
}

const createNewUser = async (input: CreateUserInput) => {
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

export { getUser, createNewUser }
