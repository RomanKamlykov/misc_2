const {map} = require("./mock")

// будем тестировать callback
describe('map function', () => {
    /** @type {array} */
    let array
    /** @type {jest.Mock} */
    let fn
    beforeEach(() => {
        array = [1, 2, 3, 5]
        fn = jest.fn(x => x ** 2)
        map(array, fn)
    })
    test('should call callback', () => {
        expect(fn).toBeCalled()
    })
    test('should call callback 4 times', () => {
        expect(fn).toBeCalledTimes(4)
        // or
        expect(fn.mock.calls.length).toBe(4)
    })
    test('should pow 2 each element', () => {
        expect(fn).nthReturnedWith(1, 1)
        expect(fn).nthReturnedWith(2, 4)
        expect(fn).nthReturnedWith(3, 9)
        expect(fn).nthReturnedWith(4, 25)
        // or
        expect(fn.mock.results[0].value).toBe(1)
        expect(fn.mock.results[1].value).toBe(4)
        expect(fn.mock.results[2].value).toBe(9)
        expect(fn.mock.results[3].value).toBe(25)
    })
    test('should work', () => {
        fn
            .mockReturnValueOnce(100)
            .mockReturnValueOnce(200)
            .mockReturnValue('42')

        expect(fn()).toBe(100)
        expect(fn()).toBe(200)
        expect(fn()).toBe('42')
        expect(fn()).toBe('42')
    })
})