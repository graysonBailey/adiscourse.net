const express = require('express');
const Datastore = require('nedb')
const socket = require('socket.io');
const fetch = require('node-fetch')


var app = express();
app.use(express.static('public'));
var server = app.listen(process.env.PORT || 8081);
//var server = app.listen(localhost:8081);
var io = socket(server);
console.log("My socket server is running Mboy");

var entire = new Datastore({
  filename: 'entire.db',
  autoload: true
});

io.on('connection', newConnection);

function newConnection(socket) {

  console.log("a new connection!")

  socket.on('unit', data => {
    socket.broadcast.emit('unit', data)
    entire.insert(data);
  })

  socket.on('relation', data => {
      entire.update({ u: data.u }, { $push: { r: data.r } }, {}, function (){})
  })

  socket.on('mouse', data => {
    socket.broadcast.emit('mouseRep', data)
    //console.log(data);
  });


}
