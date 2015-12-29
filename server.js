import Koa from 'koa';
import _ from 'lodash';
import debug from 'debug';
import IO from 'koa-socket';
import serve from 'koa-static';
import questions from './api/questions';

const app = new Koa();
const io = new IO();
const port = process.env.PORT || 3000;
const d = debug('app:server');

const connections = [];
const audience = [];

let currentQuestion = {};
let speaker = {};
let results = { a: 0, b: 0, c: 0, d: 0 };
let title = 'Untitled Presentation';

io.attach(app);
app.use(serve(__dirname + '/public'));
app.use(serve(__dirname + '/node_modules/bootstrap/dist'));

app.server.listen(port, function initServer() {
  d(`Server listening on port ${port} at ${new Date()}`);
});

io.on('connection', (ctx) => {
  ctx.socket.emit('welcome', {
    title,
    audience,
    speaker: speaker.name,
    questions,
    currentQuestion,
    results,
  });
  connections.push(ctx.socket);
  d(`Connected: ${connections.length} sockets`);
});

io.on('disconnect', (ctx) => {
  const member = _.findWhere(audience, { id: ctx.socket.id });
  if (member) {
    audience.splice(audience.indexOf(member), 1);
    io.broadcast('audience', audience);
    d(`Left: ${member.name} (Total: ${audience.length})`);
  } else if (ctx.socket.id === speaker.id) {
    debug(`${speaker.name} has left. ${title} is over `);
    speaker = {};
    title = 'Untitled Presentation';
    io.broadcast('end', { title, speaker: '' });
  }
  connections.splice(connections.indexOf(ctx.socket), 1);
  ctx.socket.disconnect();
  d(`Disconnected: ${connections.length} sockets left`);
});


io.on('start', (ctx, data) => {
  speaker.name = data.name;
  speaker.id = ctx.socket.id;
  speaker.type = 'speaker';
  title = data.title;
  ctx.socket.emit('joined', speaker);
  io.broadcast('start', { title, speaker: speaker.name });
  d(`Presentation started: ${title} by ${speaker.name}`);
});

io.on('join', (ctx, data) => {
  const newMember = {
    id: ctx.socket.id,
    name: data.name,
    type: 'audience',
  };
  ctx.socket.emit('joined', newMember);
  audience.push(newMember);
  io.broadcast('audience', audience);
  d(`Audience Joined: ${data.name}`);
});

io.on('ask', (ctx, question) => {
  currentQuestion = question;
  results = { a: 0, b: 0, c: 0, d: 0 };
  io.broadcast('ask', currentQuestion);
  d(`Question Asked: ${question.q}`);
});

io.on('answer', (ctx, data) => {
  results[data.choice]++;
  io.broadcast('results', results);
  d(`Answer: ${data.choice}`);
  d(results);
});
