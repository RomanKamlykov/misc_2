const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./Members');

// Init express
const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Homepage Route
app.get( '/', (req, res) => res.render('index', { title: 'Member App', members }) );

// Body Parser Middleware
app.use(express.json());
// To handle url-encoded data (space - %20)
app.use(express.urlencoded({ extended: false }));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));