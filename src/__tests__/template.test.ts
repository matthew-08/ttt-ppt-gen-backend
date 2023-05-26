import supertest from 'supertest'
import { app, server } from '..'
import { UserTemplateInput } from '../schema/template.schema'
import * as templateService from '../service/template.service'

describe('/api/template', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    afterEach(() => {
        server.close()
    })
    describe('GET', () => {
        it('placeholder', () => {
            expect(true).toBe(true)
        })
    })
    describe('POST', () => {
        describe('Given invalid data', () => {
            describe('Given a nonexistant template', () => {
                const body: UserTemplateInput = {
                    templateId: 25029014,
                    templateInput: [{ question: 'hello' }],
                }
                jest.spyOn(
                    templateService,
                    'getSingleTemplate'
                ).mockResolvedValue(null)
                it('returns a 404 status code', async () => {
                    await supertest(app)
                        .post('/api/template')
                        .send(body)
                        .expect(404)
                })
            })
            describe('Given invalid schema', () => {
                describe('Given invalid fields', () => {
                    it('returns a 400 status code', async () => {
                        await supertest(app)
                            .post('/api/template')
                            .send({
                                template: 1,
                                templateId: 5,
                                invalidField: '124',
                            })
                            .expect(400)
                    })
                })
            })
        })
    })
})
