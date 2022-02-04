// @ts-check
'use strict';

require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const {Op} = require('sequelize');
const {Categories, Products} = require('./models');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {message: err.message};
    }
});

router.get('/categories/root', async (ctx) => {
    const rows = await Categories.findAll({
        where: {
            parent_id: {
                [Op.is]: null
            }
        }
    });
    ctx.body = rows;
});
// SELECT l.* FROM categories l LEFT JOIN categories r ON l.parent_id = r.id WHERE r.title = $1
// SELECT ... FROM "categories" AS "categories" LEFT OUTER JOIN "categories" AS "r" ON "categories"."parent_id" = "r"."id" WHERE "r"."title" = 'fruits'
router.get('/categories/subcategories', async (ctx) => {
    const {title} = ctx.query;
    const rows = await Categories.findAll({
        where: {
            '$r.title$': title
        },
        include: {
            model: Categories,
            as: 'r',
            attributes: []
        }
    });
    ctx.body = rows;
});

router.get('/categories/:id', async (ctx) => {
    const {id} = ctx.params;
    const rows = await Categories.findOne({
        where: {id}
    });
    ctx.body = rows;
});

`WITH RECURSIVE search_tree(id) AS (
    SELECT t.id
    FROM categories t WHERE title = %L
    UNION ALL
    SELECT t.id
    FROM categories t, search_tree st
    WHERE t.parent_id = st.id
)
SELECT DISTINCT products.*
FROM product_categories
LEFT JOIN products
ON product_categories.product_id = products.id
WHERE category_id IN(SELECT * FROM search_tree)`;

router.get('/products/filter', async (ctx) => {
    const {count, rows} = await Products.findAndCountAll({
        offset: 0,
        limit: 3
    });
    ctx.body = {count, rows};
});

router.get('/products/:id', async (ctx) => {
    const {id} = ctx.params;
    const rows = await Products.findOne({
        where: {id}
    });
    ctx.body = rows;
});

app.use(router.routes());

app.listen(5000, () => {
    console.log('App is running');
});