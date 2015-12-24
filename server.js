const express = require('express');
const moment = require('moment');
const debug = require('debug');

const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

io.sockets.on('connection', function onConnect(socket) {
  debug('Connected: %s', socket.id);
});

debug('Server is running on port 3000 at %s', moment().format());
