import * as jwtModule from '../../utils/jwt'

const mockValidJwt = ({ userId }: { userId: number }) => {
    return jest.spyOn(jwtModule, 'verifyJwt').mockImplementation(() =>
        Promise.resolve({
            decodedPayload: {
                user: {
                    id: userId,
                },
            },
            expired: false,
            valid: true,
        })
    )
}

export const mockInvalidJwt = ({ userId }: { userId: number }) => {
    return jest.spyOn(jwtModule, 'verifyJwt').mockImplementation(() =>
        Promise.resolve({
            decodedPayload: null,
            expired: true,
            valid: false,
        })
    )
}

export default mockValidJwt
