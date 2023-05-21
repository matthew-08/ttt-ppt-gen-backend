import { initEnv } from '../../appConfig/env'

describe('init env', () => {
    it('throws error if any env variables are undefined', () => {
        const env = {
            port: undefined,
        }
        expect(() => initEnv(env)).toThrow()
    })
})
