const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
app.use(express.urlencoded({ extended: false })); // for handling application/x-www-form-urlencoded
app.use(express.json()); // for handling application/json
app.use('/api', apiRoutes);
app.use(express.static('public'));

app.listen(5002, () => console.log(`Server started on 5002`));
