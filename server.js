var express = require('express');
var Datastore = require('nedb')
var socket = require('socket.io');
var app = express();
app.use(express.static('dist'));
var server = app.listen(8081,'0.0.0.0');
var io = socket(server);
console.log("My socket server is running");

var entire = new Datastore({
  filename: 'entire.db',
  autoload: true
});

io.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id);

  socket.on('mouse',mouseMsg);
  //socket.on('text', textTalk);

//  function textPlace(tex){
//console.log(tex);


  //}

  function mouseMsg(data){
    socket.broadcast.emit('mouse',data);
    console.log(data);
    console.log(data.talk);
  //  console.log(tex);
  }


}
