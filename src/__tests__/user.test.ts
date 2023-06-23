import supertest from 'supertest'
import { app, server } from '..'
import { PostUserInput } from '../schema/user.schema'
import * as UserService from '../service/user.service'

const usersEndpoint = '/api/users'

describe('/user endpoint', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterEach(() => {
        server.close()
    })
    describe('users POST', () => {
        describe('user enters valid data (validation checks passed)', () => {
            beforeEach(() => {
                jest.spyOn(UserService, 'getUserService').mockResolvedValue(
                    null
                )
                jest.spyOn(UserService, 'postUserService').mockResolvedValue({
                    id: 1,
                })
            })
            const validUser: PostUserInput = {
                email: 'avalidemail@gmail.com',
                password: 'ThisIsAValidPassword*#33',
                confirmPassword: 'ThisIsAValidPassword*#33',
            }
            it('returns a 200 status code', async () => {
                await supertest(app)
                    .post(usersEndpoint)
                    .send(validUser)
                    .expect(200)
            })
            it('returns an access token', () => {
                return supertest(app)
                    .post(usersEndpoint)
                    .send(validUser)
                    .then((res) => {
                        expect(res.body.accessToken).toBeDefined()
                    })
            })
        })
        describe('client submits invalid data', () => {
            describe("given incorrect fields which don't match the schema", () => {
                const invalidUser = {
                    email: 'fakemeimaloi',
                    incorrectField: 'not a correct field',
                }
                it('sends a status 400 error code', async () => {
                    await supertest(app)
                        .post(usersEndpoint)
                        .send(invalidUser)
                        .expect(400)
                })
            })
            describe('given invalid email', () => {
                const invalidUser: PostUserInput = {
                    confirmPassword: 'Password123?',
                    password: 'Password123?',
                    email: 'user123.com',
                }
                it('sends a status 400 error code', async () => {
                    await supertest(app)
                        .post(usersEndpoint)
                        .send(invalidUser)
                        .expect(400)
                })
            })
            describe('given invalid password', () => {
                const invalidUser: PostUserInput = {
                    confirmPassword: 'pass',
                    password: 'pass',
                    email: 'user123@gmail.com',
                }
                it('sends a status 400 error code', async () => {
                    await supertest(app)
                        .post(usersEndpoint)
                        .send(invalidUser)
                        .expect(400)
                })
            })
        })
        describe('User enters an email which already exists', () => {
            const validUser: PostUserInput = {
                confirmPassword: 'Password123@g',
                password: 'Password123@g',
                email: 'user123@gmail.com',
            }

            it('sends a status 400 error code', async () => {
                jest.spyOn(UserService, 'getUserService').mockResolvedValue({
                    email: 'test',
                    id: 1,
                    passhash: 'test',
                })
                await supertest(app)
                    .post(usersEndpoint)
                    .send(validUser)
                    .expect(400)
            })
        })
    })
})
