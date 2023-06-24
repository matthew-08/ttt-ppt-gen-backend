import supertest from 'supertest'
import { app, server } from '..'
import * as jwtModule from '../utils/jwt'
import * as passCompare from '../utils/passCompare'
import * as userService from '../service/user.service'
import { UserCreateSessionInput } from '../schema/session.schema'

const sessionsEndpoint = '/api/sessions'

describe('/api/sessions', () => {
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
                    await supertest(app).get(sessionsEndpoint).expect(400)
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
                    .get(sessionsEndpoint)
                    .set('Authorization', 'Bearer')
                    .expect(401)
            })
        })
        describe('Given valid schema', () => {
            beforeEach(() => {
                jest.spyOn(jwtModule, 'verifyJwt').mockImplementation(() =>
                    Promise.resolve({
                        decodedPayload: {
                            user: {
                                id: 2,
                            },
                        },
                        expired: false,
                        valid: true,
                    })
                )
            })
            it('returns status code 200', async () => {
                await supertest(app)
                    .get(sessionsEndpoint)
                    .set('Authorization', 'Bearer 23232')
                    .expect(200)
            })
            it('returns the users id', async () => {
                await supertest(app)
                    .get(sessionsEndpoint)
                    .set('Authorization', 'Bearer')
                    .then((res) => {
                        expect(res.body.user.id).toBe(2)
                    })
            })
        })
    })
    describe('POST', () => {
        describe('Given incorrect password', () => {
            it('returns a status code 400', async () => {
                jest.spyOn(passCompare, 'passCompare').mockRejectedValue(false)
                await supertest(app).post(sessionsEndpoint).expect(400)
            })
        })
        describe('Given invalid (nonexistant) email', () => {
            it('returns a status code 400', async () => {
                jest.spyOn(userService, 'getUserService').mockResolvedValue(
                    null
                )
                await supertest(app).post(sessionsEndpoint).expect(400)
            })
        })
        describe('Given valid data', () => {
            const validUser: UserCreateSessionInput = {
                email: 'validuser@gmail.com',
                password: 'valIdPasWor13d?',
            }
            beforeEach(() => {
                jest.spyOn(passCompare, 'passCompare').mockResolvedValue(true)
                jest.spyOn(userService, 'getUserService').mockResolvedValue({
                    email: 'test@gmail.com',
                    id: 3,
                    passhash: 'passhash',
                })
            })
            it('returns a status code 200', async () => {
                await supertest(app)
                    .post(sessionsEndpoint)
                    .send(validUser)
                    .expect(200)
            })
        })
    })
})
