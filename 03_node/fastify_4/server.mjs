import Fastify from 'fastify';
import client from './db.mjs';

const server = Fastify();

server.decorate('db', client);

server.get('/', async function (req, reply) {
  const { rows } = await this.db.query('SELECT * FROM rooms');
  return rows;
});

export default server;