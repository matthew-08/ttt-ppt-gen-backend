import supertest from 'supertest'
import { server, app } from '..'
import mockValidJwt, { mockInvalidJwt } from './__mocks__/mockJwt'
import * as templateService from '../service/template.service'
import { UserTemplateResponse } from '../types'
import { PostUserTemplateInput } from '../schema/postUserTemplate.schema'
import { DeleteUserTemplateSchemaInput } from '../schema/deleteUserTemplate.schema'

const userTemplatesEndpoint = (id: number) =>
    `/api/users/${id}/templates` as const

const singleUserTemplateEndpoint = (id: number) =>
    `/api/users/${id}/templates/${id}` as const

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
                it('should return status code 401', async () => {
                    await supertest(app)
                        .get(userTemplatesEndpoint(100))
                        .set('Authorization', 'Bearer invalid')
                        .expect(401)
                })
            })
        })
    })
    describe('POST', () => {
        describe('User posts valid data', () => {
            beforeEach(() => {
                mockValidJwt({
                    userId: 555,
                })
                jest.spyOn(
                    templateService,
                    'postUserTemplateService'
                ).mockResolvedValue(null)
            })
            it('returns a status code 200', async () => {
                const validPost: PostUserTemplateInput = {
                    templateId: 3,
                    templateInput: Array(28).fill({ question: 'q' }),
                    name: 'template',
                    userId: 2,
                }
                await supertest(app)
                    .post(userTemplatesEndpoint(100))
                    .send(validPost)
                    .set('Authorization', 'Bearer eeeee')
                    .expect(200)
            })
        })
    })
})

describe('/api/users/:userId/templates/:templateId', () => {
    describe('GET', () => {
        describe('Given valid schema', () => {
            it('placeholder', () => {
                expect(true).toBe(true)
            })
        })
    })
    describe('DELETE', () => {
        describe('Given valid schema', () => {
            beforeEach(() => {
                mockValidJwt({
                    userId: 100,
                })
                jest.spyOn(
                    templateService,
                    'deleteUserTemplateService'
                ).mockResolvedValue()
            })
            const validInput: DeleteUserTemplateSchemaInput = {
                templateId: 100,
                userId: 2,
            }
            it('should return status code 200', async () => {
                await supertest(app)
                    .delete(singleUserTemplateEndpoint(100))
                    .set('Authorization', 'Bearer 123')
                    .send(validInput)
                    .expect(200)
            })
            it('should return id of deleted template', async () => {
                await supertest(app)
                    .delete(singleUserTemplateEndpoint(100))
                    .set('Authorization', 'Bearer 123')
                    .send(validInput)
                    .expect(200)
                    .then((res) => {
                        expect(res.body.templateId).toBe(100)
                    })
            })
        })
        describe('Given invalid schema', () => {
            const validInput: DeleteUserTemplateSchemaInput = {
                templateId: 100,
                userId: 2,
            }
            describe('Given valid input but no authorization header', () => {
                it('should return 400 status code', async () => {
                    await supertest(app)
                        .delete(singleUserTemplateEndpoint(100))
                        .send(validInput)
                        .expect(400)
                })
            })
            describe('Given valid input but expired / invalid access token', () => {
                it('should return 401 status code', async () => {
                    mockInvalidJwt({
                        userId: 100,
                    })
                    await supertest(app)
                        .delete(singleUserTemplateEndpoint(100))
                        .send(validInput)
                        .set('Authorization', 'Bearer 1414')
                        .expect(401)
                })
            })
            describe('Given invalid body schema', () => {
                const invalidInput = {
                    userId: 3,
                    tempId: 4, // should be templateId
                }
                it('should return 400 status code', async () => {
                    await supertest(app)
                        .delete(singleUserTemplateEndpoint(100))
                        .send(invalidInput)
                        .expect(400)
                })
            })
        })
    })
})
