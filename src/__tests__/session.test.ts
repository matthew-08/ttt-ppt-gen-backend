import supertest from 'supertest'
import { app, server } from '..'
import * as jwtModule from '../utils/jwt'

describe('/api/session', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterEach(() => {
        server.close()
    })
    describe('GET', () => {
        describe('Given invalid schema', () => {
            describe('Given request with no auth header', () => {
                it('returns status code 400', async () => {
                    await supertest(app).get('/api/session').expect(400)
                })
            })
            describe('Given request with invalid auth header format', () => {
                it('returns status code 400', async () => {
                    await supertest(app)
                        .get('/api/session')
                        .set('Authorization', 'TYPo')
                })
            })
        })
        describe('Given expired JWT', () => {
            it('Returns a 401 status code', async () => {
                jest.spyOn(jwtModule, 'verifyJwt').mockReturnValue({
                    decodedPayload: null,
                    expired: true,
                    valid: false,
                })
                await supertest(app)
                    .get('/api/session')
                    .set('Authorization', 'Bearer')
                    .expect(401)
            })
        })
        describe('Given valid schema', () => {
            beforeEach(() => {
                jest.spyOn(jwtModule, 'verifyJwt').mockReturnValue({
                    decodedPayload: {
                        id: 2,
                    },
                    expired: false,
                    valid: true,
                })
            })
            it('returns status code 200', async () => {
                await supertest(app)
                    .get('/api/session')
                    .set('Authorization', 'Bearer')
            })
            it('returns the users id', async () => {
                await supertest(app)
                    .get('/api/session')
                    .set('Authorization', 'Bearer')
                    .then((res) => {
                        expect(res.body.id).toBe(2)
                    })
            })
        })
    })
})
