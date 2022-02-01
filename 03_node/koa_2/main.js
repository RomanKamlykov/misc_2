import Koa from 'koa';
import render from 'koa-ejs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import basic from './routers/basic.mjs';
import pages from './routers/pages.mjs';
import bodyParser from 'koa-bodyparser';

const server = new Koa();

const __dirname = dirname(fileURLToPath(import.meta.url));

render(server, {
    root: join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: false
});

server
    .use(bodyParser({
        enableTypes: ['json', 'form']
    }))
    .use(basic.routes())
    .use(basic.allowedMethods())
    .use(pages.routes())
    .use(pages.allowedMethods());

server.listen(3000);