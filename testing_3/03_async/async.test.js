const {Ajax} = require("./async")

describe('Ajax echo method', () => {
    test('should return value async', async () => {
        const result = await Ajax.echo('some data')
        expect(result).toBe('some data')
    })
    test('should return value with promise', () => {
        return Ajax.echo('some data').then((result) => {
            expect(result).toBe('some data')
        })
    })
    test('should catch error async', () => {
        return Ajax.echo().catch((error) => {
            expect(error).toBeInstanceOf(Error)
        })
    })
    test('should catch error with promise', async () => {
        try {
            await Ajax.echo()
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
        }
    })
})