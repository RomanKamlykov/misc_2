const getDataFromExcel = require('./services/getDataFromExcel');
const insertDataToDB = require('./services/insertDataToDB');

async function addDocuments() {
  const array = await getDataFromExcel('./loader/file_for_upload.xlsx'); // retrieves data from an excel file
  const result = await insertDataToDB(array); // inserts the data into the mongo database
  console.log(result);
}

addDocuments();
// nodemon './loader/upload'
