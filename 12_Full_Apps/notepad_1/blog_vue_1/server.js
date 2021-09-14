const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { uri, options } = require('./mongodbConnection');
const notesRouter = require('./api/notes');
const authRoutes = require('./api/auth');
const verifyToken = require('./api/verifyToken');

mongoose.connect(uri, options);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // для работы с формами!!

app.use(express.static(path.join(__dirname, 'public_vue_3v2')));

app.use('/api', notesRouter);
// app.use('/', authRoutes);
// app.use('/', verifyToken, postsRouter);
// app.use('/', postsRouter);

// redirect to the "default" page
// app.get('*', (req, res) => {
//   res.redirect('/home');
// });

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}/`)});
