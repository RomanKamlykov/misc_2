// @ts-check

import Router from "koa-router";
import typeorm from "typeorm";
import db from "../db.mjs";
const router = new Router();
const {getConnection, getManager, getRepository} = typeorm;

router.get('/users', async (ctx) => {
    try {
        // const users = await getConnection().manager.find('User');
        // const users = await getManager().find('User');
        const users = await getRepository('User').find();
        ctx.body = users;
    } catch (error) {
        console.log(error);
        ctx.throw(500);
    }
});

router.post('/users', async (ctx) => {
    try {
        const { name } = ctx.request.body;
        await db.getRepository("User").save({ name });
        ctx.status = 201;
    } catch (error) {
        console.log(error);
        ctx.throw(500);
    }
});

export default router;