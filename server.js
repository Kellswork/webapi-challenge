const express = require('express');
const server = express();


const port = 4200;

server.listen(port, () =>
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
);

module.exports = server;