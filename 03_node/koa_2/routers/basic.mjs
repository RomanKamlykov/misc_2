import Router from 'koa-router';

const router = new Router();

router.get('/test', (ctx, next) => {
  ctx.body = 'Hello Test';
});

router.get('/params/:id', (ctx, next) => {
  ctx.body = ctx.params;
});

router.get('/query', (ctx, next) => {
  ctx.body = ctx.query;
});

router.post('/json', (ctx, next) => {
  ctx.body = ctx.request.body;
});

router.post('/form', (ctx, next) => {
  ctx.body = ctx.request.body;
});

export default router;