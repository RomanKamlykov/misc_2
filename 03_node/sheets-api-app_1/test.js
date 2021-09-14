// const https = require("https");
const fetch = require("node-fetch");

const spreadsheet = '1XuIdH5tARAxxIqUfNbs3n7SU4k8Bqo8Sh00RyVeRpZs';
const worksheet = 1;
const url = `https://spreadsheets.google.com/feeds/cells/${spreadsheet}/${worksheet}/public/values?alt=json`; // значения находятся в .feed.entry[...]
const url2 = `https://spreadsheets.google.com/feeds/list/${spreadsheet}/${worksheet}/public/values?alt=json`; // значения находятся в .feed.entry[...]
console.log(url2);

// https.get(url, res => {
//   res.setEncoding("utf8");
//   let body = "";
//   res.on("data", data => {
//     body += data;
//   });
//   res.on("end", () => {
//     body = JSON.parse(body);
//     console.log(body);
//   });
// });

async function getData() {
  const response = await fetch(url2);
  const json = await response.json();
  console.log(json.feed.entry);
}

// getData();