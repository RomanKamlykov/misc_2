const {Ajax} = require("./axios")
const axios = require("axios")

jest.mock('axios')

describe('Ajax get method', () => {
    let response
    let todos

    beforeEach(() => {
        todos = [
            {id: 1, title: 'Todo 1', completed: false},
            {id: 2, title: 'Todo 2', completed: true}
        ]
        response = {
            data: {
                todos
            }
        }
    })
    test('should return response data', () => {
        axios.get.mockReturnValue(response)
        return Ajax.get().then(data => {
            expect(data.todos).toEqual(todos)
        })
    })
})