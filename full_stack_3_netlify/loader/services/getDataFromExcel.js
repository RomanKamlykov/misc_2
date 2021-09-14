const ExcelJS = require('exceljs');

async function getDataFromExcel(file) {
  // reads an excel file
  const workbook = new ExcelJS.Workbook();
  const excelFile = await workbook.xlsx.readFile(file);

  // makes arrays with data from columns in the excel file
  // const code = excelFile.getWorksheet('wholeBase').getColumn('A').values.slice(2);
  // const brand = excelFile.getWorksheet('wholeBase').getColumn('B').values.slice(2);
  // const number = excelFile.getWorksheet('wholeBase').getColumn('C').values.slice(2);
  // const title = excelFile.getWorksheet('wholeBase').getColumn('D').values.slice(2);
  // const price = excelFile.getWorksheet('wholeBase').getColumn('E').values.slice(2);

  // const card = excelFile.worksheets[0].getColumn(1).values.slice(2);
  // const code = excelFile.worksheets[0].getColumn(2).values.slice(2);
  // const title = excelFile.worksheets[0].getColumn(3).values.slice(2);
  // const segm = excelFile.worksheets[0].getColumn(4).values.slice(2);
  // const line = excelFile.worksheets[0].getColumn(5).values.slice(2);
  // const mySegm = excelFile.worksheets[0].getColumn(6).values.slice(2);
  // const myGroup = excelFile.worksheets[0].getColumn(7).values.slice(2);
  // const mySubGroup = excelFile.worksheets[0].getColumn(8).values.slice(2);
  // const desc = excelFile.worksheets[0].getColumn(9).values.slice(2);

  const card = excelFile.worksheets[0].getColumn(1).values.slice(2);
  const mySegm = excelFile.worksheets[0].getColumn(2).values.slice(2);
  const code = excelFile.worksheets[0].getColumn(3).values.slice(2);
  const title = excelFile.worksheets[0].getColumn(4).values.slice(2);
  const desc = excelFile.worksheets[0].getColumn(5).values.slice(2);

  const arr = [];

  // fills the array with objects
  // stores each value as a string
  for (let i = 0; i < code.length; i += 1) {
    arr.push({
      // card: card[i].toString(),
      // code: code[i].toString(),
      // title: title[i].toString(),
      // segm: segm[i].toString(),
      // line: line[i].toString(),
      // mySegm: mySegm[i].toString(),
      // myGroup: myGroup[i].toString(),
      // mySubGroup: mySubGroup[i].toString(),

      // card: String(card[i]),
      // code: String(code[i]),
      // title: String(title[i]).split('] ')[1],
      // segm: String(segm[i]),
      // line: String(line[i]),
      // mySegm: String(mySegm[i] || ''),
      // myGroup: String(myGroup[i] || ''),
      // mySubGroup: String(mySubGroup[i] || ''),
      // desc: String(desc[i] || ''),

      card: String(card[i]),
      mySegm: String(mySegm[i]),
      code: String(code[i]),
      title: String(title[i]).split('] ')[1],
      desc: String(desc[i] || ''),
    });
  }

  return arr;
}

module.exports = getDataFromExcel;
