var app = require('express')();
var http = require('http');
var expressHTTP = http.Server(app)
var io = require('socket.io')(expressHTTP);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/renderer.js', function(req, res) {
  res.sendfile('renderer.js');
});

app.get('/arbor.js', function(req, res) {
  res.sendfile('arbor.js');
});

app.get('/graphics.js', function(req, res) {
  res.sendfile('graphics.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

io.on('connection', function (socket) {
  socket.emit('protest', { hello: 'world' });
 });

expressHTTP.listen(3000, function(){
  console.log('listening on *:3000');
});

///////////

var currentConnections = [];

var connect = require('connect');
var app2 = connect();
var bodyParser = require('body-parser');
app2.use(bodyParser.urlencoded());
app2.use(function(req, res) {
  console.log(req.body)
  io.emit('protest-data', req.body);
  res.end("200");
});

http.createServer(app2).listen(8000);