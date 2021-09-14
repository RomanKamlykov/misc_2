const { Router } = require('express');
const Page = require('../models/Page');
const titleMaker = require('./utils/titleMaker');
// const verifyToken = require('./verifyToken');

const router = Router();

router.post('/', async (req, res) => {
  const { parentId } = req.body;
  let parentKey = '0';

  if (parentId) {
    const parentPage = await Page.findById(parentId);
    parentKey = parentPage.key;
  }

  const page = new Page({
    parentKey,
  });

  try {
    const { _id: createdPageId } = await page.save();
    res.status(201).json(createdPageId);
  } catch (error) {
    res.status(500).json({
      message: 'Error',
      error,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const page = await Page.findById(id);
    if (page) {
      res.status(200).json(page);
    } else {
      res.status(404).json({
        message: 'No valid entry found for provided ID',
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const { markdown } = req.body;
  const update = { $set: { markdown, title: titleMaker(markdown), updatedAt: Date.now() } };

  try {
    const page = await Page.findByIdAndUpdate(id, update);
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/update-parent-key/:pageId', async (req, res) => {
  const { pageId } = req.params;
  const { parentId } = req.body;

  if (pageId === parentId) {
    return res.status(404).json({
      message: 'No valid entry found for provided data',
    });
  }

  const parentPage = await Page.findById(parentId);

  if (parentPage && parentPage.key) {
    try {
      const update = { $set: { parentKey: parentPage.key, updatedAt: Date.now() } };
      const page = await Page.findByIdAndUpdate(pageId, update);
      res.status(200).json(parentId);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json({
      message: 'No valid entry found for provided data',
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // --- start ---
    // check if there is a child page
    const currentPage = await Page.findById(id);
    const childPage = await Page.findOne({ parentKey: currentPage.key });
    if (childPage) {
      res.status(400).json({ error: 'Current page has a child page!' });
      // --- end ---
    } else {
      const { _id: deletedPageId } = await Page.findByIdAndDelete(id);
      res.status(200).json(deletedPageId);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
