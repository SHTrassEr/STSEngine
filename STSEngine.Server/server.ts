/// <reference path="./node_modules/stsEngine/server.d.ts" />
import * as http from  'http';
import STSEngine from  'stsEngine/server';


//var c = new STSEngine.AttributeListImpl();



var objectListService = new STSEngine.ObjectListServiceImpl();


var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 62785 });


var clients = new Map<number, any>();

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    console.log('connected');

    var id = Math.random();
    clients[id] = ws;

    ws.send('something');
});

var settings: Map<string, number | string> = new Map<string, number | string>();
var worldSettings = new STSEngine.WorldSettingsImpl(settings);
settings.set("moveStepSize", 10);

var objectListService = new STSEngine.ObjectListServiceImpl();
var processListService = new STSEngine.ProcessListServiceImpl();
var commandListService = new STSEngine.CommandListServiceImpl();

var world = new STSEngine.WorldImpl(worldSettings, objectListService, processListService);
var engine  = new STSEngine.EngineImpl(world, commandListService);

var playerAction = new STSEngine.PlayerActionImpl(1, commandListService);

var gameServer = new STSEngine.GameServerImpl(engine);


var handler = (world, currentStepNumber: number, commandList) => {
    for (var key in clients) {
        clients[key].send("" + currentStepNumber);
    }
};

gameServer.setOnUpdateWorld(handler);
gameServer.start();


var registerPlayerAttributeList: STSEngine.IKeyValuePair[] = [];
registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.CommandType, STSEngine.CommandType.RegisterPlayer));
registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.PlayerId, 0))
registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.NewPlayerId, 1))
commandListService.createCommand(registerPlayerAttributeList);

