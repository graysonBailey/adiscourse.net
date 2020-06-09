const express = require('express');
const socket = require('socket.io');






var app = express();
app.use(express.static('dist'));
app.use(express.jason({
  limit:'1mb'
}));
var server = app.listen(8081,'0.0.0.0');
var io = socket(server);
console.log("My socket server is running");




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
