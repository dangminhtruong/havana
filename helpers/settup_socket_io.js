var express = require('express');
var router = express.Router();
module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('Initial an socket connetion');
        socket.on('disconnect', function () {
            console.log('user disconnected');
            io.sockets.emit('user disconnected');
        });
    });

    return router;
};