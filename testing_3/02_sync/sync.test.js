const {Lodash} = require("./sync");

describe('Lodash compact method', () => {
    let _
    let arr
    beforeEach(() => {
        _ = new Lodash()
        arr = [false, 42, 0, '', true, null, 'hello']
    })
    test('should be defined', () => {
        expect(_.compact).toBeDefined()
        expect(_.compact).not.toBeUndefined()
    })
    test('should remove falsy values from array', () => {
        const res = [42, true, 'hello']
        expect(_.compact(arr)).toEqual(res)
    })
    test('should no contain falsy values', () => {
        expect(_.compact(arr)).not.toContain(false)
        expect(_.compact(arr)).not.toContain(undefined)
        expect(_.compact(arr)).not.toContain(null)
        expect(_.compact(arr)).not.toContain(0)
        expect(_.compact(arr)).not.toContain('')
    })
})

describe('Lodash groupBy method', () => {
    let _
    let arr
    beforeEach(() => {
        _ = new Lodash()
        arr = [false, 42, 0, '', true, null, 'hello']
    })
    test('should be defined', () => {
        expect(_.groupBy).toBeDefined()
        expect(_.groupBy).not.toBeUndefined()
    })
    test('should group array items by Math.floor', () => {
        const array = [2.2, 2.4, 4.2, 3.1]
        const result = {
            2: [2.2, 2.4],
            4: [4.2],
            3: [3.1]
        }
        expect(_.groupBy(array, Math.floor)).toEqual(result)
    })
    test('should group array items by length', () => {
        const array = ['one', 'two', 'three']
        const result = {
            3: ['one', 'two'],
            5: ['three']
        }
        expect(_.groupBy(array, 'length')).toEqual(result)
    })
    test('should not return array', () => {
        expect(_.groupBy([], Math.trunc)).not.toBeInstanceOf(Array)
    })
})