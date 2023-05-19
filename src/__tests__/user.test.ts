import { exec } from 'child_process'
import { request } from 'http'
import supertest from 'supertest'
import { app, server } from '..'

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
        describe('user enters invalid data', () => {
            const invalidUser = {
                email: 'fakemeimaloi',
                password: 'password',
            }
            it('sends a status 400 error code', async () => {
                await supertest(app).post('/user').send(invalidUser).expect(400)
            })
        })
    })
    describe('user GET')
})
