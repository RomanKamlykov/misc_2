const express = require('express');
const mongoose = require('mongoose');
const { uri, options } = require('./mongodbConnection');
const path = require('path');
const getCyrillisch = require('./utils/getCyrillisch');

mongoose.connect(uri, options);
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/convert', async function(req, res) {
  const { text } = req.body;
  // const cyrillisch = text;
  const cyrillisch = await getCyrillisch(text);
  res.json({ cyrillisch });
});

app.listen(5006);
