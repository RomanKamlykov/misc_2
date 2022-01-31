const fastify = require('fastify')({ logger: true })

fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'fastify-api' }
    }
})
fastify.register(require('./routes').itemRoutes)

fastify.listen(3000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})