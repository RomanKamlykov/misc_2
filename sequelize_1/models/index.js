// @ts-check
'use strict';

const {Sequelize, DataTypes} = require('sequelize');
const {PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE} = process.env;

const sequelize = new Sequelize(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.products = require('./products.model')(sequelize, DataTypes);
db.categories = require('./categories.model')(sequelize, DataTypes);
db.productCategories = require('./product-categories.model')(sequelize, DataTypes);

// associations
db.categories.hasMany(db.categories, {sourceKey: 'parent_id', foreignKey: 'id'});

module.exports = db;