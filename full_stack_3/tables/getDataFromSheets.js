const { google } = require('googleapis');

async function getDataFromSheets() {
  
  // настройки доступа
  const sheets = google.sheets({
    version: 'v4',
    auth: 'AIzaSyAdxlEKw_JG8iYozYw4Podl8gH40eORKqw' // specify your API key here
  });

  // настройки запроса
  const options = {
    spreadsheetId: '16Fw0-P4fioEje0lXoGRZXMAGwx_aJkuZf_IjfS5Na8A', // таблица "ТЖ"
    range: 'БазаТЖ!A1:G',
    // range: 'БазаТЖ!A1:G20', //dev
    majorDimension: 'COLUMNS'
  }

  // чтение таблицы гугл
  const response = await sheets.spreadsheets.values.get(options);
  const columns = response.data.values;

  // получаем "столбцы" с данными
  const card = columns[0].slice(1);
  const brand = columns[1].slice(1);
  const number = columns[2].slice(1);
  const name = columns[3].slice(1);
  const volume = columns[4].slice(1);
  const group = columns[5].slice(1);
  const description = columns[6].slice(1);

  let arr = [];

  for(let i=0;i<card.length;i++) {
    arr[i] = {
      card: card[i].trim(),
      brand: brand[i].trim(),
      number: number[i].trim(),
      name: name[i].trim(),
      volume: volume[i].trim(),
      group: group[i].trim(),
      description: description[i].trim()
    }
  }

  // console.log(arr);
  return arr;
};

// getDataFromSheets().catch(console.error);
module.exports = getDataFromSheets;