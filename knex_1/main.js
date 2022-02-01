// @ts-check
'use strict';

require('dotenv').config();
const express = require('express');
const {db} = require('./db');

const app = express();

app.get('/', (req, res) => {
    res.send('ok');
});

app.get('/categories/root', async (req, res) => {
    try {
        const rows = await db.select().from('categories').whereNull('parent_id');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/categories/subcategories', async (req, res) => {
    try {
        /**
         * @type {string}
         */
        const {title} = req.query;
        const categories = await db.select('l.*').from('categories AS l').leftJoin('categories AS r', 'l.parent_id', 'r.id').where('r.title', title);
        const subquery = db.select('mypath').from('categories_mat').where('title', title);
        const path = await db.select('id', 'title', 'parent_id').from('categories_mat').where('mypath', '@>', subquery);
        res.json({categories, path});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/products/filter', async (req, res) => {
    try {
        /**
         * @type {string}
         */
        const {title} = req.query;
        const title_to_path = db.select('mypath').from('categories_mat').where('title', title);
        const path_to_ids = db.select('id').from('categories_mat').where('mypath', '<@', title_to_path);
        const products = await db.distinct().from('products_mat').whereIn('category_id', path_to_ids).limit(3);
        const count = await db.countDistinct('id').from('products_mat').whereIn('category_id', path_to_ids);
        res.json({products, count});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        /**
         * @type {string}
         */
        const {id} = req.params;
        const rows = await db.select().from('products').where('id', parseInt(id));
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(5000, () => {
    console.log('App is running');
});