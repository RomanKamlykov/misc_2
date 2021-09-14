const ExcelJS = require('exceljs');

async function getDataFromExcel() {
  
  // чтение файла excel
  const workbook = new ExcelJS.Workbook();
  let excelFile = await workbook.xlsx.readFile('../Price.xlsx'); // файл "Price.xlsx"
  // let excelFile = await workbook.xlsx.readFile('./Price2.xlsx'); // dev

  // получаем "столбцы" с данными
  const card = excelFile.getWorksheet('PriceList').getColumn('B').values.slice(3);
  const brand = excelFile.getWorksheet('PriceList').getColumn('A').values.slice(3);
  const number = excelFile.getWorksheet('PriceList').getColumn('C').values.slice(3);
  const name = excelFile.getWorksheet('PriceList').getColumn('D').values.slice(3);
  const price = excelFile.getWorksheet('PriceList').getColumn('G').values.slice(3);
  const kharkiv = excelFile.getWorksheet('PriceList').getColumn('H').values.slice(3);
  const kyiv = excelFile.getWorksheet('PriceList').getColumn('I').values.slice(3);
  const others = excelFile.getWorksheet('PriceList').getColumn('J').values.slice(3);

  let arr = [];

  for(let i=0;i<card.length;i++) {
    arr[i] = {
      card: card[i].trim(),
      brand: brand[i].trim(),
      number: number[i].trim(),
      name: name[i].trim(),
      price: price[i],
      kharkiv: kharkiv[i].trim(),
      kyiv: kyiv[i].trim(),
      others: others[i].trim()
    }
  }
  
  // console.log(arr);
  return arr;
}

// getDataFromExcel().catch(console.error);
module.exports = getDataFromExcel;