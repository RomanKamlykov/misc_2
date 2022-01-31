import Fastify from "fastify";
import Autoload from "fastify-autoload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const fastify = Fastify();

fastify.register(import("./routes/index.js"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function(fastify, opts) {
  fastify.register(Autoload, {
    dir: join(__dirname, "auto")
  });
  
  fastify.get('/', async (req, reply) => {
    return "Hello world";
  });
  
  fastify.post('/', async (req, reply) => {
    const { name } = req.body;
    return name;
  });
  
  fastify.listen(3000);
}
