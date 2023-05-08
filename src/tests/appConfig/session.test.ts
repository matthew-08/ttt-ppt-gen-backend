import instantiateSession from '../../appConfig/session'

describe('application session', () => {
    beforeEach(() => {
        jest.mock<typeof import('../../appConfig/env')>(
            '../../appConfig/env.ts',
            () => {
                return {
                    default: {
                        port: '3000000',
                        sessionSecret: undefined,
                    },
                }
            }
        )
    })
    it('throws error if no secret env variable', () => {
        expect(instantiateSession).toThrow()
    })
})
