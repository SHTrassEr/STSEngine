
import http = require('http');

var STSEngine = require(__dirname + '/Scripts/Lib/STSEngine.js');



var objectListService = new STSEngine.ObjectListServiceImpl();

var port = process.env.port || 1337
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);



var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: 62785 });


wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

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

gameServer.start();


var registerPlayerAttributeList = [];
registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.NewPlayerId, 1));
commandListService.createCommand(STSEngine.CommandType.RegisterPlayer, 0, registerPlayerAttributeList);