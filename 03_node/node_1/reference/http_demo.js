const http = require('http');

// Create server object
http.createServer((req, res) => {
  // When we get request --> Write respons
  res.write('Hello World');
  res.end();
}).listen(5000, () => console.log('Server running...')); // слушает порт 5000