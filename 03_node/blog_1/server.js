const express = require("express");
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }); // mongoose setup

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // this gives access to req.body in routes
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  // const articles = [{
  //   title: 'Test Article',
  //   createdAt: new Date,
  //   description: 'Test description'
  // },{
  //   title: 'Test Article 2',
  //   createdAt: new Date,
  //   description: 'Test description 2'
  // }]
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles: articles }); // articles will be available at index.ejs for rendering
});

app.use('/articles', articleRouter); // adds '/articles' to all routes
app.listen(5000); // http://localhost:5000/