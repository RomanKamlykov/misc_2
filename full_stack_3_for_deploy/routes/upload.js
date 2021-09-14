const router = require('express').Router()
const fs = require('fs')
const getDataFromExcel = require('./services/getDataFromExcel')
const insertDataToDB = require('./services/insertDataToDB')

router.post('/', async (req, res) => {
  const array = await getDataFromExcel(req.file.path) // retrieves data from an excel file
  await insertDataToDB(array) // inserts the data into the mongo database
  console.log('Uploaded!')

  fs.unlink(req.file.path, () => { // deletes the excel file from the file system
    res.sendStatus(201)
  });
})

module.exports = router