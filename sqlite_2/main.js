#!/usr/bin/env node
// @ts-check
import app from './app.mjs';

app.listen(5000, () => {
    console.log('App is running');
});