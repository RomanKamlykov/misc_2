const ExcelJS = require('exceljs');

async function getDataFromExcel(file) {
  
  // reads an excel file
  const workbook = new ExcelJS.Workbook()
  let excelFile = await workbook.xlsx.readFile(file)

  // makes arrays with data from columns in the excel file
  const code = excelFile.getWorksheet('PriceList').getColumn('A').values.slice(2)
  const brand = excelFile.getWorksheet('PriceList').getColumn('B').values.slice(2)
  const number = excelFile.getWorksheet('PriceList').getColumn('C').values.slice(2)
  const title = excelFile.getWorksheet('PriceList').getColumn('D').values.slice(2)
  const price = excelFile.getWorksheet('PriceList').getColumn('E').values.slice(2)
  
  let arr = []

  // fills the array with objects
  // stores each value as a string
  for (let i=0;i<code.length;i++) {
    arr.push({
      code: code[i].toString(),
      brand: brand[i].toString(),
      number: number[i].toString(),
      title: title[i].toString(),
      price: price[i].toString()
    })
  }

  return arr
}

module.exports = getDataFromExcel