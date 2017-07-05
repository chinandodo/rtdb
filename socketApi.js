var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;
var u = 0;

io.on('connection', function(socket){
    console.log(++u + ' user connected!');
    socket.on('disconnect', function(){
        console.log(--u + ' user connected!');
    });
});


socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;
