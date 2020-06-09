var express = require('express');
var Datastore = require('nedb')
var socket = require('socket.io');
var app = express();
app.use(express.static('dist'));
var server = app.listen(8081,'0.0.0.0');
var io = socket(server);
console.log("My socket server is running Mboy");

var entire = new Datastore({
  filename: 'entire.db',
  autoload: true
});

io.on('connection', newConnection);

function newConnection(socket) {

  console.log("oh a connecion")

  socket.on('unit', data => {
    socket.broadcast.emit('unit', data)
    entire.insert(data);
  })

  socket.on('relation', data => {
      entire.update({ u: data.u }, { $push: { r: data.r } }, {}, function (){})
  })

  socket.on('mouse', data => {
    socket.broadcast.emit('mouse', data)
    console.log(data);
  });


}
