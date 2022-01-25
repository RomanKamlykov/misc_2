// @ts-check
'use strict';

/**
 *
 * @param {import('./index.js').sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => sequelize.define(
    'product_categories',
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        }
    },
    {
        timestamps: false
    }
);
// CREATE TABLE IF NOT EXISTS product_categories (
//     id SERIAL PRIMARY KEY,
//     product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
//     category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE
// );