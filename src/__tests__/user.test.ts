import supertest from 'supertest'
import { app, server } from '..'
import { CreateUserInput } from '../schema/user.schema'

describe('/user endpoint', () => {
    afterEach(() => {
        server.close()
    })
    describe('users POST', () => {
        describe('user enters valid data (validation checks passed)', () => {
            const validUser = {
                email: 'avalidemail@gmail.com',
                password: 'ThisIsAValidPassword*#33',
            }
            it('returns a 200 status code', () => {
                return supertest(app)
                    .post('/user')
                    .send(validUser)
                    .expect(200)
                    .then((res) => console.log(res.header))
            })
        })
        describe('client submits invalid data', () => {
            describe("given incorrect fields which don't match the schema", () => {
                const invalidUser = {
                    email: 'fakemeimaloi',
                    incorrectField: 'not a correct field',
                }
                it.only('sends a status 400 error code', async () => {
                    await supertest(app)
                        .post('/api/user')
                        .send(invalidUser)
                        .expect(400)
                })
            })
            describe('given values which do not conform to the schema requirements', () => {
                const invalidUser: CreateUserInput = {
                    email: 'invalidemail',
                    password: 'ValidPassword123',
                    confirmPassword: 'ValidPassword123',
                }
                describe('given invalid email', () => {
                    it.only('sends a status 400 error code', async () => {
                        await supertest(app)
                            .post('/api/user')
                            .send(invalidUser)
                            .expect(400)
                    })
                })
            })
        })
    })
})
