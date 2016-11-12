/// <reference path="./node_modules/stsEngine/server.d.ts" />
/// <reference path="./node_modules/stsEngine.example/server.d.ts" />
import * as http from  'http';
import STSEngine from  'stsEngine/server';

import STSEngineExample from  'stsEngine.example/server';

STSEngine.Example = STSEngineExample;

var w = new STSEngine.Example.ObjectPlayer();


//var c = new STSEngine.AttributeListImpl();




var WebSocketServer = require('ws').Server;
var server = new WebSocketServer({ port: 62785 });

var webSocketGameServer = new STSEngine.Example.WebSocketGameServer(server);

webSocketGameServer.start();

/*

var registerPlayerAttributeList: STSEngine.IKeyValuePair[] = [];
registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.CommandType, STSEngine.CommandType.RegisterPlayer));
registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.PlayerId, 0))
registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.NewPlayerId, 1))
commandListService.createCommand(registerPlayerAttributeList);

*/