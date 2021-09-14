const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();
app.use('/api', apiRoutes);

app.listen(5002, () => console.log('Server started on port 5002'));
