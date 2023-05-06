import sum from '..'

describe('sum module', () => {
    it('sums', () => {
        expect(sum(2, 2)).toBe(4)
    })
})
