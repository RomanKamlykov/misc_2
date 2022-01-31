/**
 * @type {import ("fastify").RouteShorthandOptions}
 */
const postOptions = {
  schema: {
    body: {
      type: "object",
      required: ["genre"],
      genre: {
        type: "string"
      }
    },
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            genre: {
              type: "string" // срезаем id
            }
          }
        }
      }
    }
  }
}

/**
 * @param {import ("fastify").FastifyInstance} fastify
 * @param {*} opts
 */
export default async (fastify, opts) => {
  const genres = fastify.music();

  fastify.get('/test', async (req, reply) => {
    // reply.code(200).send('Got to test route');
    return genres;
  });

  fastify.get('/test/:id', async (req, reply) => {
    const { id } = req.params;
    const genre = genres.find(genre => genre.id === +id);
    if (genre === undefined) reply.code(404);
    return genre;
  });

  fastify.post('/test', postOptions, async (req, reply) => {
    const { genre } = req.body;
    if (genre === undefined) reply.code(400);
    return fastify.music(genre);
  });
}