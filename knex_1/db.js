// @ts-check
'use strict';

const {knex} = require('knex');
const {PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE} = process.env;

exports.db = knex({
    client: 'pg',
    connection: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`
});