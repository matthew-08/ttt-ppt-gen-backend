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

export default mockValidJwt
