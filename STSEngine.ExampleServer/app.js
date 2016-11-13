(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'express', './routes/index', 'http', 'path', 'stylus', 'stsEngine/server', 'stsEngine.example/server'], factory);
    }
})(function (require, exports) {
    "use strict";
    const express = require('express');
    const routes = require('./routes/index');
    const http = require('http');
    const path = require('path');
    var app = express();
    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    const stylus = require('stylus');
    app.use(stylus.middleware(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));
    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }
    app.get('/', routes.index);
    app.get('/about', routes.about);
    app.get('/contact', routes.contact);
    app.get('/game', routes.game);
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
    const server_1 = require('stsEngine/server');
    const server_2 = require('stsEngine.example/server');
    server_1.default.Example = server_2.default;
    var w = new server_1.default.Example.ObjectPlayer();
    var WebSocketServer = require('ws').Server;
    var server = new WebSocketServer({ port: 62785 });
    var webSocketGameServer = new server_1.default.Example.WebSocketGameServer(server);
    webSocketGameServer.start();
});
