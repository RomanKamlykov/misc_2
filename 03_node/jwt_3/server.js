const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { uri, options } = require('./mongodbConnection');
const verifyToken = require('./routes/verifyToken');

// Middleware
app.use(express.json()); // to work with req.body

// Connect to DB
mongoose.connect(uri, options, () => console.log('connected to db'));

// Import Routes
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

// Route Middlewares
app.use('/api/user', authRouter);
app.use('/api/posts', verifyToken, postsRouter);

app.listen(3001, () => console.log('Server running at http://localhost:3001/'));
