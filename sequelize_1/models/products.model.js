// @ts-check
'use strict';

/**
 *
 * @param {import('./index.js').sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => sequelize.define(
    'products',
    {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        picture_original: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture_preview: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        updated: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);
// CREATE TABLE IF NOT EXISTS products (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR(100) NOT NULL,
//     description TEXT NOT NULL,
//     price DECIMAL NOT NULL,
//     picture_original VARCHAR(255) NOT NULL,
//     picture_preview VARCHAR(255) NOT NULL,
//     created BIGINT NOT NULL,
//     updated BIGINT NOT NULL
// );