// @ts-check
const {fastify} = require('fastify')
const Category = require('./entities/category.entity.cjs');

const app = fastify();

app.register(require('fastify-typeorm-plugin'), {
  type: 'sqlite',
  database: 'sqlite::memory:',
  synchronize: true,
  entities: [Category],
  logging: ["query", "error"]
});

app.get('/category', async function(req, reply) {
  const [categories, count] = await this.orm
    .getRepository(Category)
    .findAndCount();
  return {categories, count};
});

app.post('/category', async function(req, reply) {
  this.orm
    .getRepository(Category)
    .save([
      { name: "Timber" }, 
      { name: "Phantom" }
    ]);
  return 'ok';
});

module.exports = app;