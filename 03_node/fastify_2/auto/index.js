/**
 * @param {import ("fastify").FastifyInstance} fastify
 * @param {*} opts
 */
 export default async (fastify, opts) => {
  fastify.get('/auto', async (req, reply) => {
    reply.code(200).send('Got to auto route');
  });
}