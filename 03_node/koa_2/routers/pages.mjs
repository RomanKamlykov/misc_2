import Router from 'koa-router';

const router = new Router();

const list = ['Item 1', 'Item 2', 'Item 3'];

router.get('/', async (ctx, next) => {
  await ctx.render('home');
});

router.get('/list', async (ctx, next) => {
  await ctx.render('list', { list });
});

router.post('/list', async (ctx, next) => {
  list.push(`Item ${list.length + 1}`)
  await ctx.render('list', { list });
});

export default router;