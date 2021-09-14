const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config();
const todoRoutes = require('./routes/todos');

const { USER, PASSWORD, DBNAME } = process.env;

const PORT = process.env.PORT || 3000;
const URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.whqg7.mongodb.net/${DBNAME}`;

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs', // расширение файлов по умолчанию
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs'); // движок рендеринга страниц
app.set('views', 'views'); // откуда берутся страницы

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // это позволяет использовать статичные файлы из папки public
app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    // сервер стартует после подключения к БД
    app.listen(PORT, () => {
      console.log('Server has been started');
    });
  } catch (error) {
    console.log(error);
  }
}

start();
