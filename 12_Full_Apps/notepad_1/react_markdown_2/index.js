const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { uri, options } = require('./mongodbConnection');
const pageRoutes = require('./api/routes/page');
const pagesRoutes = require('./api/routes/pages');
const verifyToken = require('./api/routes/verifyToken');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/page', pageRoutes);
app.use('/pages', pagesRoutes);

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`App available on http://localhost:${PORT}`));
async function start() {
  try {
    await mongoose.connect(uri, options);
    app.listen(PORT, () => {
      console.log(`App available on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
