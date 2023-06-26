import { template } from '@babel/core'
import supertest from 'supertest'
import { server, app } from '..'
import mockValidJwt, { mockInvalidJwt } from './__mocks__/mockJwt'
import * as templateService from '../service/template.service'
import { PatchUserTemplateInput } from '../schema/patchUserTemplate.schema'
import * as slideService from '../service/slide.service'

const slidesEndpoint = ({
    templateId,
    userId,
}: {
    userId: number
    templateId: number
}) => `/api/users/${userId}/templates/${template}/slides` as const

describe('/api/users/:userId/templates/:templateId/slides', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterEach(() => {
        server.close()
    })
    describe('GET', () => {
        describe('given valid input', () => {
            beforeEach(() => {
                mockValidJwt({
                    userId: 100,
                })
            })
            it('should send an array of slides templates and status code 200', async () => {
                jest.spyOn(
                    templateService,
                    'getUserTemplateSlidesService'
                ).mockResolvedValue([
                    {
                        id: 1,
                        slide_no: 28,
                        template_id: 4,
                        user_ppt_slide_field: [{}],
                    },
                ])
                await supertest(app)
                    .get(
                        slidesEndpoint({
                            templateId: 4,
                            userId: 3,
                        })
                    )
                    .set('Authorization', 'Bearer 155')
                    .expect(200)
                    .then((res) => {
                        expect(res.body).toBeInstanceOf(Array)
                        expect(res.body[0]).toBeInstanceOf(Object)
                        expect(res.body[0].templateId).toBeDefined
                    })
            })
        })
        describe('given invalid input', () => {
            describe('given invalid or missing JWT', () => {
                it('it returns a status code 401', async () => {
                    mockInvalidJwt({
                        userId: 3,
                    })
                    await supertest(app)
                        .get(
                            slidesEndpoint({
                                templateId: 4,
                                userId: 3,
                            })
                        )
                        .set('Authorization', 'Bearer 124')
                        .expect(401)
                })
            })
        })
    })
    describe('PATCH', () => {
        describe('given valid input', () => {
            beforeEach(() => {
                mockValidJwt({
                    userId: 3,
                })
            })
            const validInput: PatchUserTemplateInput = {
                templateId: 4,
                updatedSlides: [
                    {
                        fields: [{ content: 'hello world', id: 3 }],
                        id: 3,
                    },
                ],
            }
            it('returns status code 200', async () => {
                jest.spyOn(
                    slideService,
                    'patchSlidesService'
                ).mockResolvedValue()
                await supertest(app)
                    .patch(
                        slidesEndpoint({
                            templateId: 4,
                            userId: 3,
                        })
                    )
                    .set('Authorization', 'Bearer 15')
                    .send(validInput)
                    .expect(200)
            })
        })
    })
})
