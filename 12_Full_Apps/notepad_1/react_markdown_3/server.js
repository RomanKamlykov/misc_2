const express = require('express');
const mongoose = require('mongoose');
const { uri, options } = require('./mongodbConnection');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');
const notesRouter = require('./routes/notes');

mongoose.connect(uri, options);
const app = express();
app.use(express.urlencoded({ extended: false })); // for handling application/x-www-form-urlencoded
app.use(cookieParser()); // for handling cookies
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use('/', authRoutes);
app.use('/', verifyToken, notesRouter);

// redirect to the "default" page
app.get('*', (req, res) => {
  res.redirect('/home');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT);
