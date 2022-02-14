const {assert} = require('chai')
const {sayHello, addNumbers} = require("../app")

describe('sayHello', () => {
    it('should return hello', () => {
        assert.equal(sayHello(), 'hello')
    })
    it('should return type string', () => {
        assert.typeOf(sayHello(), 'string')
    })
})

describe('addNumbers', () => {
    it('should return 4', () => {
        assert.equal(addNumbers(2, 2), 4)
    })
    it('should return type number', () => {
        assert.typeOf(addNumbers(2, 2), 'number')
    })
    it('should return above 3', () => {
        assert.isAbove(addNumbers(2, 2), 3)
    })
})