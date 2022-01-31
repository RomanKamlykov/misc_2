const items = require("../items");

const Item = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        name: {
            type: 'string'
        }
    }
}

const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            }
        }
    }
}

const _getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer'
                        },
                        name: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }
}

const getItemOpts = {
    schema: {
        response: {
            200: Item
        }
    }
}

function itemRoutes(fastify, options, done) {

    fastify.get('/items', getItemsOpts, (req, reply) => {
        reply.send(items)
    })

    fastify.get('/items/:id', getItemOpts, (req, reply) => {
        const { id } = req.params
        const item = items.find(item => item.id === +id)
        reply.send(item)
    })

    done()
}

module.exports = { itemRoutes }