import { prismaClient } from '../db/prisma'
import { CreateUserInput } from '../schema/user.schema'

const getUser = async (input: CreateUserInput) => {
    return await prismaClient.users.findFirst({
        where: {
            email: input.email,
        },
    })
}

export { getUser }
