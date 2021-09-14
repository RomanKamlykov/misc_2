import express from 'express';

const app = express();

interface Params {
  a: number;
  b: number;
}
const add = (x: Params): number => {
  return x.a + x.b;
}
type Add = (x: Params) => number;
const add2: Add = (x) => {
  return x.a + x.b;
}

app.get('/', (req, res) => {
  res.send('Hello from ts');
});

app.listen(5000);
