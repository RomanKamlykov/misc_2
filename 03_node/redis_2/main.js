// @ts-check

import express from 'express';
import fetch from 'node-fetch';
import redis from 'redis';

const PORT = process.env.PORT || 5000;
const client = redis.createClient();
const app = express();
await client.connect();

function setResponse(username, repos) {
    return `<h2>${username} has ${repos} GitHub repos.</h2>`;
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
async function getRepos(req, res, next) {
    try {
        console.log('Fetching data ...');
        const { username } = req.params;
        const response = await fetch(`https://api.github.com/users/${username}`);
        /** @type {{public_repos: number}} */
        const data = await response.json();
        const repos = data.public_repos;

        // set data to redis
        await client.setEx(username, 3600, String(repos));
        res.send(setResponse(username, repos));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

// cache middleware
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
async function cache(req, res, next) {
    try {
        const { username } = req.params;
        const data = await client.get(username);
        if (data !== null) {
            res.send(setResponse(username, data));
        } else {
            next();
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

app.get('/repos/:username', cache, getRepos);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});