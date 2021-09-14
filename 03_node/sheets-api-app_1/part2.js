const { google } = require('googleapis');
const keys = require('./keys.json');
const ExcelJS = require('exceljs');

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens){
  if (err) {
    console.log(err);
    return;
  } else {
    // console.log('Connected!');
    gsrun(client);
  }
});

async function gsrun(cl) {
  const gsapi = google.sheets({ version: 'v4', auth: cl });

  // чтение файла excel
  const workbook = new ExcelJS.Workbook();
  let excelFile = await workbook.xlsx.readFile('./file.xlsx');
  
  let worksheet = excelFile.getWorksheet('Sheet1'); // fetch sheet by name
  // let worksheet = excelFile.getWorksheet(0); // fetch sheet by id
  // let worksheet = excelFile.worksheets[0]; // fetch sheet by id
  let values = worksheet.getSheetValues();

  let mappedValues = values.slice(1).map(function(row){ // удаляем первую строку (empty item)
    row.shift(); // удаляем первую ячейку (empty item)
    row.forEach((cell, i) => {
      if(cell.result) row[i] = cell.result; // перезаписываем ячейки с формулами на значения
    })
    return row;
  });
  
  // очистка таблицы
  // const clearOptions = {
  //   spreadsheetId: '142jhrhsiiTWCra-DXLQFrVVwdM5AxlY4rjcSsE2PjDg',
  //   range: 'Sheet1!A1:E'
  // };
  // await gsapi.spreadsheets.values.clear(clearOptions);

  // запись данных в таблицу
  // const updateOptions = {
  //   spreadsheetId: '142jhrhsiiTWCra-DXLQFrVVwdM5AxlY4rjcSsE2PjDg',
  //   range: 'Sheet1!A1',
  //   valueInputOption: 'USER_ENTERED',
  //   resource: { values: mappedValues }
  // };
  // await gsapi.spreadsheets.values.update(updateOptions);

  const workbook2 = new ExcelJS.Workbook();
  let excelFile2 = await workbook2.xlsx.readFile('./Price.xlsx');
  let arr = [];

  arr.push( excelFile2.getWorksheet('PriceList').getColumn('B').values.slice(1).map(el => el.trim()) );
  arr.push( excelFile2.getWorksheet('PriceList').getColumn('G').values.slice(1) );
  arr.push( excelFile2.getWorksheet('PriceList').getColumn('H').values.slice(1).map(el => el.trim()) );
  arr.push( excelFile2.getWorksheet('PriceList').getColumn('I').values.slice(1).map(el => el.trim()) );
  arr.push( excelFile2.getWorksheet('PriceList').getColumn('J').values.slice(1).map(el => el.trim()) );
  
  // запись данных в таблицу
  const updateOptions = {
    spreadsheetId: '142jhrhsiiTWCra-DXLQFrVVwdM5AxlY4rjcSsE2PjDg',
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    resource: { majorDimension: 'COLUMNS', values: arr }
  };
  await gsapi.spreadsheets.values.update(updateOptions);
}