const { google } = require('googleapis');
const keys = require('./keys.json');

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

  // получение данных из таблицы
  const getOptions = {
    spreadsheetId: '1XuIdH5tARAxxIqUfNbs3n7SU4k8Bqo8Sh00RyVeRpZs', // файл spreadsheets2web_test
    range: 'Sheet1!A1:B11'
  };
  let response = await gsapi.spreadsheets.values.get(getOptions);
  let dataArray = response.data.values;
  
  // функция для борьбы с пустыми ячейками
  dataArray = dataArray.map(function(row){
    while(row.length < dataArray[0].length){
      row.push('');
    }
    return row;
  })

  // запись данных в таблицу
  let newDataArray = dataArray.map(function(row){
    row.push(row[0] + '-' + row[1]);
    return row;
  });
  const updateOptions = {
    spreadsheetId: '1XuIdH5tARAxxIqUfNbs3n7SU4k8Bqo8Sh00RyVeRpZs', // файл spreadsheets2web_test
    range: 'Sheet1!E1',
    valueInputOption: 'USER_ENTERED',
    resource: { values: newDataArray }
  };
  response = await gsapi.spreadsheets.values.update(updateOptions);
}