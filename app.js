var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(process.env.PORT || process.env.VCAP_APP_PORT || 8000);

app.use(express.static(__dirname + '/public'));

app.get('/channel.html', function (req, res) {
    var oneYear = 31536000;

    res.set({
        'Pragma': 'public',
        'Cache-Control': 'max-age=' + oneYear,
        'Expires': new Date(Date.now() + oneYear * 1000).toUTCString()
    });

    res.sendfile(__dirname + '/public/channel.html');
});

app.all('/xo/', function (req, res) {
    res.sendfile(__dirname + '/public/xo.html');
});

var waitingFor = {}, games = {};

io.sockets.on('connection', function (socket) {
    var myUid, opponentUid, gameId;

    socket.on('uid', function (uid) {
        myUid = uid;

        if (waitingFor[myUid]) {
            var opponentSocket = waitingFor[myUid];
            delete waitingFor[myUid];

            games[gameId = String(Date.now() * Math.random())] = {
                X: opponentSocket,
                O: socket,
                timeout: undefined
            };

            opponentSocket.setGameId(gameId);

            opponentSocket.emit('game', gameId, myUid, 'X');
            socket.emit('game', gameId, opponentSocket.getUid(), 'O');

            restart();
        }
    });

    socket.getUid = function () {
        return myUid;
    };

    socket.setGameId = function (gid) {
        gameId = gid;
    };

    function restart() {
        stop();

        if (games[gameId]) {
            games[gameId].timeout = setTimeout(function(game) {
                stop();
                game.X.emit('timeout');
                game.O.emit('timeout');
                delete games[gameId];
            }, 30000, games[gameId]);
        }
    }

    function stop() {
        if (games[gameId] && games[gameId].timeout) {
            clearTimeout(games[gameId].timeout);
            games[gameId].timeout = undefined;
        }
    }

    socket.on('waitingFor', function (uid) {
        opponentUid = uid;
        waitingFor[opponentUid] = socket;
    });

    socket.on('move', function (gameId, row, col, color) {
        if (games[gameId]) {
            games[gameId][color === 'X' ? 'O' : 'X'].emit('move', row, col, color);
            restart();
        }
    });

    socket.on('end', function () {
        stop();
        delete games[gameId];
    });

    socket.on('disconnect', function () {
        if (waitingFor[opponentUid] === socket) {
            delete waitingFor[opponentUid];
        }

        stop();
        delete games[gameId];
    });
});
