import Fastify from 'fastify';
import formBodyPlugin from 'fastify-formbody';
const server = Fastify();

server.register(formBodyPlugin);

server.get('/', async (req, reply) => {
  return { hello: 'world' }
});

server.get('/query', async (req, reply) => {
  return req.query;
});

server.post('/json', async (req, reply) => {
  return req.body;
});

server.post('/form', async (req, reply) => {
  return req.body;
});

export default server;