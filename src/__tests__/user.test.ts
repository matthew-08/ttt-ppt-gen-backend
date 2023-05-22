import supertest from 'supertest'
import { app, server } from '..'
import { database } from '../db/database'
import { CreateUserInput } from '../schema/user.schema'
import { MockContext, Context, createMockContext } from './__mocks__/context'
import * as UserService from '../service/user.service'
import { mock } from 'node:test'
import { mockClear } from 'jest-mock-extended'

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
                jest.spyOn(UserService, 'getUser').mockResolvedValue({
                    email: 'avalidemail@gmail.com',
                    id: 2,
                    passhash: '1',
                })
            })
            const validUser: CreateUserInput = {
                email: 'avalidemail@gmail.com',
                password: 'ThisIsAValidPassword*#33',
                confirmPassword: 'ThisIsAValidPassword*#33',
            }
            it('returns a 200 status code', () => {
                return supertest(app)
                    .post('/api/user')
                    .send(validUser)
                    .expect(200)
            })
            it('sets the authorization header', () => {
                return supertest(app)
                    .post('/api/user')
                    .send(validUser)
                    .then((res) => {
                        expect(res.headers.authorization).toBeDefined()
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
                        .post('/api/user')
                        .send(invalidUser)
                        .expect(400)
                })
            })
            describe('given invalid email', () => {
                const invalidUser: CreateUserInput = {
                    confirmPassword: 'Password123?',
                    password: 'Password123?',
                    email: 'user123.com',
                }
                it('sends a status 400 error code', async () => {
                    await supertest(app)
                        .post('/api/user')
                        .send(invalidUser)
                        .expect(400)
                })
            })
            describe('given invalid password', () => {
                const invalidUser: CreateUserInput = {
                    confirmPassword: 'pass',
                    password: 'pass',
                    email: 'user123@gmail.com',
                }
                it('sends a status 400 error code', async () => {
                    await supertest(app)
                        .post('/api/user')
                        .send(invalidUser)
                        .expect(400)
                })
            })
        })
        describe('User enters an email which already exists', () => {
            const validUser: CreateUserInput = {
                confirmPassword: 'Password123@g',
                password: 'Password123@g',
                email: 'user123@gmail.com',
            }

            it('sends a status 400 error code', async () => {
                jest.spyOn(UserService, 'getUser').mockResolvedValue(null)
                await supertest(app)
                    .post('/api/user')
                    .send(validUser)
                    .expect(400)
            })
        })
    })
})
