import { template } from '@babel/core'
import supertest from 'supertest'
import { server, app } from '..'
import mockValidJwt from './__mocks__/mockJwt'
import * as templateService from '../service/template.service'

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
            it('should return status code 200', async () => {
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
                            userId: 100,
                        })
                    )
                    .set('Authorization', 'Bearer 155')
                    .expect(200)
            })
            it('should send an array of slides templates', async () => {
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
                        expect(res.body[0].templateId).toBeDefined()
                    })
            })
        })
    })
})
