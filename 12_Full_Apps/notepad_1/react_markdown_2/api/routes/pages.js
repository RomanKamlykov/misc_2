const { Router } = require('express');
const Page = require('../models/Page');

const router = Router();

router.get('/recent', async (req, res) => {
  try {
    const pages = await Page.find().sort({ updatedAt: -1 }).limit(10);
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/path/:id', async (req, res) => {
  const { id: currentPageId } = req.params;
  const path = []; // path to current page
  let loopLimit = 10;

  try {
    const allPages = await Page.find();

    path.unshift(
      allPages.find((page) => String(page._id) === currentPageId),
    );

    while (Boolean(loopLimit) && (path[0].parentKey !== '0')) {
      path.unshift(allPages.find((page) => String(page.key) === path[0].parentKey));
      loopLimit -= 1;
    }

    res.status(200).json(path);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/child/:id', async (req, res) => {
  const { id } = req.params;

  let pages = [];

  try {
    if (id === '0') {
      pages = await Page.find({ parentKey: '0' }).sort({ title: 1 });
    } else {
      const page = await Page.findById(id);
      pages = await Page.find({ parentKey: page.key }).sort({ title: 1 });
    }

    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/search/:query', async (req, res) => {
  const { query } = req.params;

  try {
    const pages = await Page.find({ markdown: { $regex: `.*${query}.*` } }).sort({ updatedAt: -1 });
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
