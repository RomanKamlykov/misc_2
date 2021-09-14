const axios = require('axios');
const redis = require('redis');
require('dotenv').config();

const client = redis.createClient();
client.on('connect', () => {
  console.log('Connected to Redis');
  client.flushall();
});

const { SPREADSHEET_ID, API_KEY } = process.env;
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet
?ranges=verb_irr!B2:C
&ranges=verb_irr!D2:E
&ranges=verb_irr!F2:G
&ranges=verb_irr!H2:I
&ranges=verb!B2:C
&ranges=noun_groups!D2:E
&ranges=preposition!B2:C
&ranges=pronoun!B2:C
&ranges=pronoun!D2:E
&ranges=pronoun!F2:G
&ranges=pronoun!H2:I
&ranges=pronoun!J2:K
&ranges=adjective!C2:D
&ranges=determiner!A2:B
&ranges=adverb!B2:C
&ranges=misc!A2:B
&majorDimension=ROWS&key=${API_KEY}`.replaceAll('\n', '');

async function getData() {
  // const values = [];
  try {
    const { data } = await axios.get(URL);
    // data.valueRanges.forEach(arr => { 
    //   values.push(...arr.values);
    // });

    data.valueRanges.forEach(arr => { 
      arr.values.forEach(el => {
        if(!el[0] || !el[1]) return;
        client.set(el[0], el[1]);
      });
    });

    // values.forEach((el) => {
    //   if(!el[0] || !el[1]) return;
    //   client.set(el[0], el[1]);
    // });
  } catch (error) {
    console.log(error);
  }
  client.quit();
};

getData();
// node upload2redis.js
