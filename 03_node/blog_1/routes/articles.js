const express = require("express");
const router = express.Router(); // ==app.get('/', (req, res) => { res.render('index'); });
const Article = require('./../models/article');

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() }); // simply pass blank object
});

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('articles/edit', { article: article });
});

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug }); // Article's methods are async
  if (article == null) res.redirect('/');
  res.render('articles/show', { article: article });
});

router.post('/', async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });

  try {
    article = await article.save(); // Article's methods are async
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    res.render('articles/new', { article: article }); // thus, the typed information will remain on the page
  }
});

router.put('/:id', async (req, res) => {
  let article = await Article.findById(req.params.id);
  article.title = req.body.title
  article.description = req.body.description
  article.markdown = req.body.markdown

  try {
    article = await article.save(); // Article's methods are async
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    res.render('articles/edit', { article: article }); // thus, the typed information will remain on the page
  }
});

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// with middleware
// router.post('/', async (req, res, next) => {
//   req.article = new Article();
//   next();
// }, saveArticleAndRedirect('new'));
// router.put('/:id', async (req, res, next) => {
//   req.article = await Article.findById(req.params.id);
//   next();
// }, saveArticleAndRedirect('edit'));

// moddleware
function saveArticleAndRedirect(path) {
  // path "new" or "edit"
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
  
    try {
      article = await article.save(); // Article's methods are async
      res.redirect(`/articles/${article.slug}`);
    } catch (error) {
      res.render(`articles/${path}`, { article: article }); // thus, the typed information will remain on the page
    }
  }
}

module.exports = router;