if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(3001);
