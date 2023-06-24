import { server, app } from '..'

describe('/api/users/id/templates', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    afterEach(() => {
        server.close()
    })
})
