// @ts-check
import Router from "express";
import fetch from 'node-fetch';
import apiCache from 'apicache';

const { API_BASE_URL, API_KEY_NAME, API_KEY_VALUE } = process.env;
const router = Router();
const cache = apiCache.middleware;

router.get('/', cache('2 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...req.query,
        });
        const response = await fetch(`${API_BASE_URL}?${params}`);
        const data = await response.json();
        res.json(data);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;