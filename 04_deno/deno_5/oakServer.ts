import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();
router.get('/books', (ctx) => {
  ctx.response.body = {
    books: ['book1', 'book2', 'book3', 'book4']
  }
});

app.use(router.routes());

// app.use((ctx) => {
//   ctx.response.status = 404;
//   ctx.response.body = "Page not found";
// });

await app.listen({ port: 8000 });
