﻿let Matter = require('matter-js/build/matter.js');

let CircularJSON = require('circular-json');
import express = require('express');
import routes = require('./routes/index');
import http = require('http');
import path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 62784);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

import stylus = require('stylus');
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


//import STSEngine from  'stsEngine.core/server';
import STSEngine from 'stsEngine.example.tanks/server';

/*if (!STSEngine.Example) {
    STSEngine.Example = {};
}*/

STSEngine.Example = <any>STSEngine;

//STSEngine.Example.Tanks = STSEngineExampleTanks;

var WebSocketServer = require('ws').Server;
var server = new WebSocketServer({ port: 62785 });
var webSocketGameServer = new STSEngine.Example.Tanks.WebSocketGameServer(server);

//var webSocketGameServer = new STSEngine.Example.Tanks.WebSocketGameServer(server);

webSocketGameServer.start();
