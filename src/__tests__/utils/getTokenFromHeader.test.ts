import { getTokenFromHeader } from '../../utils/getTokenFromHeader'

describe('token extractor util', () => {
    it('returns the token from an authorzation header', () => {
        const token = getTokenFromHeader('Bearer aigjeigj3298ug8u589198j189j8g')
        expect(token).toBe('aigjeigj3298ug8u589198j189j8g')
    })
})
