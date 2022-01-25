// @ts-check
'use strict';

require('dotenv').config();
const express = require('express');
const {Op} = require('sequelize');
const Categories = require('./models').categories;
const Products = require('./models').products;

const app = express();

app.get('/categories/root', async (req, res) => {
    try {
        const rows = await Categories.findAll({
            where: {
                parent_id: {
                    [Op.is]: null
                }
            }
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// 'SELECT l.* FROM categories l LEFT JOIN categories r ON l.parent_id = r.id WHERE r.title = $1',
app.get('/categories/subcategories', async (req, res) => {
    try {
        const {title} = req.query;
        const rows = await Categories.findAll({
            include: {
                model: Categories,
                where: {title}
            }
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/categories/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const rows = await Categories.findOne({
            where: {id}
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
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

app.get('/products/filter', async (req, res) => {
    try {
        const {count, rows} = await Products.findAndCountAll({
            offset: 0,
            limit: 3
        });
        res.json({count, rows});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const rows = await Products.findOne({
            where: {id}
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(5000, () => {
    console.log('App is running');
});