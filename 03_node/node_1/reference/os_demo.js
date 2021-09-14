const os = require('os');

// Platform
console.log(os.platform());

// CPU Arch
console.log(os.arch());

// CPU Core Info
console.log(os.cpus());

// Free memory
console.log(os.freemem());

// Total memory
console.log(os.totalmem()); // os.totalmem()/1024/1024/1024 --> GB

// Home dir
console.log(os.homedir());

// Uptime
console.log(os.uptime()); // seconds