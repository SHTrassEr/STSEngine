(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'stsEngine/server'], factory);
    }
})(function (require, exports) {
    "use strict";
    const server_1 = require('stsEngine/server');
    //var c = new STSEngine.AttributeListImpl();
    var objectListService = new server_1.default.ObjectListServiceImpl();
    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({ port: 62785 });
    var clients = new Map();
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });
        console.log('connected');
        var id = Math.random();
        clients[id] = ws;
        ws.send('something');
    });
    var settings = new Map();
    var worldSettings = new server_1.default.WorldSettingsImpl(settings);
    settings.set("moveStepSize", 10);
    var objectListService = new server_1.default.ObjectListServiceImpl();
    var processListService = new server_1.default.ProcessListServiceImpl();
    var commandListService = new server_1.default.CommandListServiceImpl();
    var world = new server_1.default.WorldImpl(worldSettings, objectListService, processListService);
    var engine = new server_1.default.EngineImpl(world, commandListService);
    var playerAction = new server_1.default.PlayerActionImpl(1, commandListService);
    var gameServer = new server_1.default.GameServerImpl(engine);
    var handler = (world, currentStepNumber, commandList) => {
        for (var key in clients) {
            clients[key].send("" + currentStepNumber);
        }
    };
    gameServer.setOnUpdateWorld(handler);
    gameServer.start();
    var registerPlayerAttributeList = [];
    registerPlayerAttributeList.push(new server_1.default.KeyValuePairImpl(server_1.default.AttributeType.CommandType, server_1.default.CommandType.RegisterPlayer));
    registerPlayerAttributeList.push(new server_1.default.KeyValuePairImpl(server_1.default.AttributeType.PlayerId, 0));
    registerPlayerAttributeList.push(new server_1.default.KeyValuePairImpl(server_1.default.AttributeType.NewPlayerId, 1));
    commandListService.createCommand(registerPlayerAttributeList);
});
