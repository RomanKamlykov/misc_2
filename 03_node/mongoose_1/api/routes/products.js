const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res, next) => {
  // -- added mongoose logic ---
  try {
    const docs = await Product.find();
    console.log(docs);
    res.status(200).json({
      message: 'Handling GET requests to /products',
      products: docs
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      error
    });
  }
  // -- added mongoose logic ---
});

router.post('/', async (req, res, next) => {
  // -- added mongoose logic ---
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  try {
    const result = await product.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /products',
      createdProduct: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error
    });
  }
  // -- added mongoose logic ---
});

router.get('/:productId', async (req, res, next) => {
  const id = req.params.productId;
  // -- added mongoose logic ---
  try {
    const doc = await Product.findById(id);
    console.log(doc);
    if (doc) {
      res.status(200).json({
        message: 'Handling GET requests to /products/:productId',
        product: doc
      });
    } else {
      res.status(404).json({
        message: "No valid entry found for provided ID"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      error
    });
  }
  // -- added mongoose logic ---
});

router.patch('/:productId', async (req, res, next) => {
  const id = req.params.productId;

  // -- added mongoose logic ---
  // const { newName, newPrice } = req.body;
  // const result = await Product.updateOne({ _id: id }, { $set: { name: newName, price: newPrice } });
  // т.к. могут быть не все аргументы в запросе меняем логику
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  try {
    const result = await Product.updateOne({ _id: id }, { $set: updateOps });
    console.log(result);
    res.status(200).json({
      message: 'Updated product!',
      id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      error
    });
  }
  // -- added mongoose logic ---
});

router.delete('/:productId', async (req, res, next) => {
  const id = req.params.productId;
  // -- added mongoose logic ---
  try {
    const result = await Product.remove({ _id: id });
    console.log(result);
    res.status(200).json({
      message: 'Deleted product!',
      id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      error
    });
  }
  // -- added mongoose logic ---
});

module.exports = router;
