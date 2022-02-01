// @ts-check

import Koa from 'koa';
import router from './routers/users.router.mjs';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

export default app;