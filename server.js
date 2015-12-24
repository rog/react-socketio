const express = require('express');
const moment = require('moment');
const _ = require('lodash');
const debug = require('debug')('server');

const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);

const connections = [];
const audience = [];
const title = 'Untitled Presentation';

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

io.sockets.on('connection', function onConnect(socket) {
  socket.once('disconnect', function onDisconnect() {
    const member = _.findWhere(audience, { id: this.id });
    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit('audience', audience);
      debug(`Left: ${member.name} (Total: ${audience.length})`);
    }
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    debug(`Disconnected: ${connections.length} sockets`);
  });
  socket.on('join', function joinEmit(payload) {
    const newMember = {
      id: this.id,
      name: payload.name,
    };
    this.emit('joined', newMember);
    audience.push(newMember);
    io.sockets.emit('audience', audience);
    debug(`Audience Joined: ${payload.name}`);
  });
  socket.emit('welcome', {
    title,
  });
  connections.push(socket);
  debug(`Connected: ${connections.length} sockets`);
});

debug('Server is running on port 3000 at %s', moment().format());
