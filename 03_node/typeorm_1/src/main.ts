import 'reflect-metadata';
import 'dotenv/config';
import Koa from 'koa';
import Router from 'koa-router';
import {Connection, createConnection, getRepository} from 'typeorm';
import {User} from './user.entity';
const {PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE} = process.env;

const app = new Koa<object, { db: Connection }>();
const router = new Router();

createConnection({
    type: 'postgres',
    url: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`,
    entities: [User]
});

router.get('/', (ctx) => {
    ctx.body = 'ok';
});

router.get('/users', async (ctx) => {
    const users = getRepository('User');
    const rows = await users.find({});
    ctx.body = rows;
});

router.post('/users', async (ctx) => {
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.isActive = true;
    await user.save();
    ctx.status = 201;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(5000, () => {
    console.log('App is running');
});