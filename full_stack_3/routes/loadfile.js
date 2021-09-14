const express = require('express');
const router = express.Router();
const fs = require('fs');
const getDataFromExcel = require('./wholeBase/getDataFromExcel');
const insertMany = require('./wholeBase/test');


router.post('/', async (req, res) => {
  // console.log(req.file.path);
  const array = await getDataFromExcel(req.file.path);
  await insertMany(array);
  // req.files.file.mv('./uploads/' + 'price.xlsx');
  // res.sendStatus(415);
  // res.sendStatus(200);
  // res.status(201).json({ file: req.file });
  // res.status(413).json({ error: 'Too large' });
  // return;

  fs.unlink(req.file.path, () => {
    res.sendStatus(201);
  });
})

module.exports = router;