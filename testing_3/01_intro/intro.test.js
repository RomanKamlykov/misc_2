const {sum, nativeNull} = require("./intro.js");

describe('sum function', () => {
    test('should return the sum of two values', () => {
        expect(sum(1, 1)).toBe(2)
        expect(sum(1, 1)).toEqual(2) // ≈≈toBe
    })
    test('should return the sum of two floats correctly', () => {
        // expect(sum(0.1, 0.2)).toBe(0.3) // failed
        expect(sum(0.1, 0.2)).toBeCloseTo(0.3) // passed
    })
})

describe('nativeNull function', () => {
    test('should return the false value null', () => {
        expect(nativeNull()).toBe(null)
        expect(nativeNull()).toBeNull() // ==toBe(null)
        expect(nativeNull()).toBeFalsy() // false, undefined, null, 0, ''
        expect(nativeNull()).toBeDefined() // !=undefined
        expect(nativeNull()).not.toBeTruthy()
        expect(nativeNull()).not.toBeUndefined()
    })
})