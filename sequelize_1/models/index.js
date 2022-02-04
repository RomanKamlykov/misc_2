// @ts-check
'use strict';

const {Sequelize, DataTypes} = require('sequelize');
const {PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE} = process.env;

const sequelize = new Sequelize(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`);

const Products = require('./products.model')(sequelize, DataTypes);
const Categories = require('./categories.model')(sequelize, DataTypes);
const ProductCategories = require('./product-categories.model')(sequelize, DataTypes);

// associations
Categories.hasMany(Categories, {as: 'r', sourceKey: 'parent_id', foreignKey: 'id'});
Categories.belongsTo(Categories, {as: 'l', foreignKey: 'id', targetKey: 'parent_id'});

module.exports = {sequelize, Products, Categories, ProductCategories};