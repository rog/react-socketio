const express = require('express');
const moment = require('moment');
const debug = require('debug')('server');

const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);

const connections = [];

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

io.sockets.on('connection', function onConnect(socket) {
  socket.once('disconnect', function onDisconnect() {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    debug(`Disconnected: ${connections.length} sockets`);
  });
  connections.push(socket);
  debug(`Connected: ${connections.length} sockets`);
});

debug('Server is running on port 3000 at %s', moment().format());
