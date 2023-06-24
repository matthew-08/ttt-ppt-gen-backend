import supertest from 'supertest'
import { server, app } from '..'
import * as jwtModule from '../utils/jwt'
import mockValidJwt from './__mocks__/mockJwt'
import * as templateService from '../service/template.service'
import { UserTemplateResponse } from '../types'

const userTemplatesEndpoint = (id: number) =>
    `/api/users/${id}/templates` as const

describe('/api/users/:id/templates', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    afterEach(() => {
        server.close()
    })
    describe('GET', () => {
        describe('given valid data', () => {
            beforeEach(() => {
                mockValidJwt({
                    userId: 2,
                })
            })
            it('should return status code 200', async () => {
                await supertest(app)
                    .get(userTemplatesEndpoint(100))
                    .set('Authorization', 'Bearer 23232')
                    .expect(200)
            })
            describe('res body', () => {
                beforeEach(() => {
                    jest.spyOn(
                        templateService,
                        'getAllUserTemplatesService'
                    ).mockResolvedValue([
                        {
                            created_on: '2',
                            id: 2,
                            name: 'test template',
                            ppt_template: {
                                id: 1,
                                img: 'img.jpeg',
                                name: 'ppt name',
                                slide_amount: 1,
                            },
                            times_generated: 1,
                            user_id: 2,
                        },
                    ])
                })
                it('should return a list of user templates', async () => {
                    await supertest(app)
                        .get(userTemplatesEndpoint(100))
                        .set('Authorization', 'Bearer 23232')
                        .expect(200)
                        .then((res) => {
                            expect(res.body).toBeInstanceOf(Array)
                        })
                })
                it('should match expected structure', async () => {
                    await supertest(app)
                        .get(userTemplatesEndpoint(100))
                        .set('Authorization', 'Bearer 23232')
                        .expect(200)
                        .then((res) => {
                            const responseKeys: readonly [
                                ...(keyof UserTemplateResponse)[]
                            ] = [
                                'createdOn',
                                'id',
                                'name',
                                'templateInfo',
                                'timesGenerated',
                            ]
                            expect(
                                responseKeys.every((item) =>
                                    Object.keys(res.body[0]).includes(item)
                                )
                            ).toBe(true)
                        })
                })
            })
        })
        describe('given invalid data', () => {
            describe('given invalid access token', () => {
                it('should return status code 401', () => {
                    expect(false).toBe(true)
                })
            })
        })
    })
})
