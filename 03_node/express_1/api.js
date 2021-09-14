const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

// Init express
const app = express();

// Init middleware
// app.use(logger);

// Body Parser Middleware
app.use(express.json());
// To handle url-encoded data (space - %20)
app.use(express.urlencoded({ extended: false }));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));