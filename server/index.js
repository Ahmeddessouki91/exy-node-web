const config = require('./config/config');
const app = require('./server');
const http = require('http');

const server = http.createServer(app);

server.listen(config.port, console.log(`Server is listening on port ${config.port}`));