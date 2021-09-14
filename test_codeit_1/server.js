const express = require('express');
const path = require('path');
const usersRoutes = require('./routes/users.routes');
const postsRoutes = require('./routes/posts.routes');
const { sequelize } = require('./mysql/db');
const { PORT } = require('./config').server;

const app = express();
app.use(express.json());
sequelize.sync();
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use(express.static(path.join(__dirname, './public/dist')));

app.listen(PORT, async () => {
  console.log('The server is running on http://localhost:3000/');
});
