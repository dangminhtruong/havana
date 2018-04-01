var express = require('express');
var router = express.Router();
module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('Initial an socket connetion');
    });
    return router;
};