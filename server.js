/* eslint strict: [0, "global"] */
'use strict';
const express = require('express');
const moment = require('moment');
const _ = require('lodash');
const debug = require('debug')('server');

const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);

const connections = [];
const audience = [];
const questions = require('./api/questions');

let currentQuestion = false;
let speaker = {};
let title = 'Untitled Presentation';

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

io.sockets.on('connection', function onConnect(socket) {
  socket.once('disconnect', function onDisconnect() {
    const member = _.findWhere(audience, { id: this.id });
    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit('audience', audience);
      debug(`Left: ${member.name} (Total: ${audience.length})`);
    } else if (this.id === speaker.id) {
      debug(`${speaker.name} has left. ${title} is over `);
      speaker = {};
      title = 'Untitled Presentation';
      io.sockets.emit('end', { title, speaker: '' });
    }
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    debug(`Disconnected: ${connections.length} sockets`);
  });
  socket.on('join', function joinEmit(payload) {
    const newMember = {
      id: this.id,
      name: payload.name,
      type: 'audience',
    };
    this.emit('joined', newMember);
    audience.push(newMember);
    io.sockets.emit('audience', audience);
    debug(`Audience Joined: ${payload.name}`);
  });
  socket.on('start', function startSpeaker(payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = 'speaker';
    title = payload.title;
    this.emit('joined', speaker);
    io.sockets.emit('start', { title, speaker: speaker.name });
    debug(`Presentation started: ${title} by ${speaker.name}`);
  });
  socket.on('ask', function askQuestion(question) {
    currentQuestion = question;
    io.sockets.emit('ask', currentQuestion);
    debug(`Question Asked: ${question.q}`);
  });
  socket.emit('welcome', {
    title,
    audience,
    speaker: speaker.name,
    questions,
    currentQuestion,
  });
  connections.push(socket);
  debug(`Connected: ${connections.length} sockets`);
});

debug('Server is running on port 3000 at %s', moment().format());
