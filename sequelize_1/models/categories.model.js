// @ts-check
'use strict';

/**
 *
 * @param {import('./index.js').sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => sequelize.define(
    'categories',
    {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        parent_id: {
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
// CREATE TABLE IF NOT EXISTS categories (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR(100) NOT NULL,
//     parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL CHECK (parent_id != id)
// );