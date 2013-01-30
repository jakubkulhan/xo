var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(process.env.PORT || process.env.VCAP_APP_PORT || 8000);

app.use(express.static(__dirname + '/public'));
