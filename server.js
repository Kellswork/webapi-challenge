const express = require('express');
const server = express();

const port = 4200;

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

server.listen(port, () =>
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
);

module.exports = {server, logger};
